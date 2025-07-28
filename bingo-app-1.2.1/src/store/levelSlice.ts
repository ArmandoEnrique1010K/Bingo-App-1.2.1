import { StateCreator } from "zustand";
import { Modal } from "../types";
import { AudioSliceType } from "./audioSlice";
import { ANYMORE_ENDING, BALLS_SOUND, CLICK_SOUND, DEFEAT_SOUND, } from "../constants/audioSettings";
import { EXIT_MODAL, NO_MORE_ROUNDS_MODAL, NONE_MODAL, RESET_LEVEL_MODAL, START_LEVEL_MODAL } from "../constants/statusModalsText";
import { DEFAULT_TARGETS, MAX_TURNS, TARGET_GENERATION_DELAY } from "../constants/defaultConfigs";
import { generateTargets } from "../utils/generateTargets";
import { initialPowerups, PowerUpSliceType } from "./powerUpSlice";
import { BotSliceType } from "./botSlice";
import { generateBoard } from "../utils/Board/generateBoard";
import { createIdBoard } from "../utils/Bot/createIdBoard";
import { GameSliceType } from "./gameSlice";
import { PlayerSliceType } from "./playerSlice";

export type LevelSliceType = {
  modal: Modal,
  isStatusModalOpen: boolean,
  currentRound: number,
  currentTargets: number[],
  excludedTargets: number[],
  gameEnded: boolean;
  winner: string
  changeStatusModal: (modal: Modal) => void,
  openStatusModal: () => void,
  closeStatusModal: () => void,
  openResetLevelModal: () => void;
  openExitLevelModal: () => void;
  noMoreRoundModal: () => void;
  generateNewTargets: () => void;
  defaultLevelState: () => void;
  resetLevelState: () => void;
};

export const levelSlice: StateCreator<LevelSliceType & AudioSliceType & PowerUpSliceType & BotSliceType & GameSliceType & PlayerSliceType, [], [], LevelSliceType> = (set, get) => ({
  modal: NONE_MODAL,
  isStatusModalOpen: false,
  currentRound: 0,
  currentTargets: [],
  excludedTargets: [],
  gameEnded: true,
  winner: "",

  changeStatusModal: (modal) => {
    set({
      modal: modal,
      isStatusModalOpen: true
    });
  },

  openStatusModal: () => {
    set({
      isStatusModalOpen: true
    })
    get().playSound(CLICK_SOUND)
  },

  closeStatusModal: () => {
    set({
      isStatusModalOpen: false,
    })
    get().playSound(CLICK_SOUND)
  },

  openResetLevelModal: () => {
    set({
      modal: RESET_LEVEL_MODAL,
      isStatusModalOpen: true
    })
    get().playSound(CLICK_SOUND)
  },

  openExitLevelModal: () => {
    set({
      modal: EXIT_MODAL,
      isStatusModalOpen: true,
    })
    get().playSound(CLICK_SOUND)
  },

  noMoreRoundModal: () => {
    set({
      gameEnded: true,
      modal: NO_MORE_ROUNDS_MODAL,
      isStatusModalOpen: true
    })
    get().playSound(DEFEAT_SOUND)
    get().changeMusic(ANYMORE_ENDING)
  },

  generateNewTargets: () => {
    get().resetBotTimeouts()
    if (get().currentRound === MAX_TURNS) {
      set({ currentTargets: [], winner: "end" });
      get().noMoreRoundModal()
    } else {
      set({ currentRound: get().currentRound + 1, currentTargets: [] });
      get().playSound(BALLS_SOUND)
      setTimeout(() => {
        const newTargets = generateTargets(
          // TODO: NO OLVIDAR ACTIVAR EL POWERUP DE AÑADIR 2 OBJETIVOS EXTRA
          get().powerups.extraTargets.active ? DEFAULT_TARGETS + 2 :
            DEFAULT_TARGETS, get().excludedTargets);
        set({
          currentTargets: newTargets,
          excludedTargets: [...get().excludedTargets, ...newTargets]
        });
      }, TARGET_GENERATION_DELAY);
    }

    // TODO: ZONA DE POWERUPS
    if (get().powerups.extraTargets.active) {
      get().decrementExtraTargetsTurn();
    }

    if (get().powerups.slowBots.active) {
      get().decrementActivateSlowBots();
    } 
  },

  defaultLevelState: () => {
    set({
      playerBoards: [],
      botBoards: [],
      currentTargets: [],
      currentRound: 0,
      winner: '',
      excludedTargets: [],
      markedCells: [],
      isStatusModalOpen: false,
      modal: NONE_MODAL,
      currentBoard: { id: 0, board: [] },
      confirmedWinners: {},
      gameEnded: true,
      powerups: initialPowerups,
      foundCells: [],
      botMarkedCells: [],
    })
    get().resetBotTimeouts()
  },

  resetLevelState: () => {
    const levelData = get().levelData;
    const { boards, bots, music } = levelData

    const createPlayerBoards = Array.from({ length: boards }).map((_, index) => ({
      id: index + 1,
      board: generateBoard(),
    }));

    const createBotBoards = bots.map((bot, botIndex) => ({
      name: bot.name,
      boards: Array.from({ length: bot.boards }).map((_, boardIndex) => ({
        id: createIdBoard(botIndex, boardIndex),
        board: generateBoard(),
      })),
    }));

    const initialSelectedNumbersAndPositions = Array.from({ length: boards }).map((_, index) => (
      {
        id: index + 1,
        board: [
          {
            position: 13,
            number: 0
          }
        ]
      }
    ))

    set({
      botBoards: createBotBoards,
      playerBoards: createPlayerBoards,
    })

    const botInitialSelectedNumbersAndPositions = get().botBoards.map((bot) => ({
      name: bot.name,
      boards: bot.boards.map((board) => ({
        id: board.id,
        board: [
          {
            position: 13,
            number: 0
          }
        ]
      }))
    }));

    set({
      botMarkedCells: botInitialSelectedNumbersAndPositions,
      currentTargets: [],
      currentRound: 0,
      winner: 'none',
      excludedTargets: [],
      isStatusModalOpen: true,
      modal: START_LEVEL_MODAL,
      confirmedWinners: {},
      gameEnded: false,
      powerups: initialPowerups,
      foundCells: [],
      markedCells: initialSelectedNumbersAndPositions,
      currentBoard: get().playerBoards?.find(b => b.id === 1) || { id: 0, board: [] },
    })

    get().resetBotTimeouts()
    get().changeMusic(music)
  },
});