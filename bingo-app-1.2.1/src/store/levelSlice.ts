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

  currentTargets: number[],
  excludedTargets: number[],
  currentRound: number,
  modal: Modal,
  isStatusModalOpen: boolean,
  changeStatusModal: (modal: Modal) => void,
  closeStatusModal: () => void,
  openStatusModal: () => void,
  winner: string
  openExitLevelModal: () => void;
  resetLevelState: () => void;
  noMoreRoundModal: () => void;
  openResetLevelModal: () => void;
  generateNewTargets: () => void,

  defaultLevelState: () => void;
};



export const levelSlice: StateCreator<LevelSliceType & AudioSliceType & PowerUpSliceType & BotSliceType & GameSliceType & PlayerSliceType, [], [], LevelSliceType> = (set, get) => ({
  currentTargets: [],
  excludedTargets: [],
  currentRound: 0,

  modal: NONE_MODAL,
  isStatusModalOpen: false,
  changeStatusModal: (modal) => {
    set({
      modal: modal,
      isStatusModalOpen: true
    });
  },


  generateNewTargets: () => {

    if (get().currentRound === MAX_TURNS) {
      set({ currentTargets: [], winner: "end" });
      get().noMoreRoundModal()

    } else {
      set({ currentRound: get().currentRound + 1, currentTargets: [] });

      get().playSound(BALLS_SOUND)
      setTimeout(() => {
        const newTargets = generateTargets(

          // NO OLVIDAR ACTIVAR EL POWERUP DE AÑADIR 2 OBJETIVOS EXTRA
          get().powerups.extraTargets.active ? DEFAULT_TARGETS + 2 :
            DEFAULT_TARGETS, get().excludedTargets);
        set({
          currentTargets: newTargets,
          excludedTargets: [...get().excludedTargets, ...newTargets]
        });
      }, TARGET_GENERATION_DELAY);
    }

    console.log('CAMBIANDO OBJETIVOS')
    get().timeoutsIds.forEach(timeoutId => clearTimeout(timeoutId));
    set({ timeoutsIds: [] });

    // TODO: ZONA DE POWERUPS
    if (get().powerups.extraTargets.active) {
      get().decrementExtraTargetsTurn();
    }

  },


  winner: "",
  // changeWinner: (value) => {
  //   set({ winner: value });
  // },

  openExitLevelModal: () => {
    get().playSound(CLICK_SOUND)

    set({
      modal: EXIT_MODAL,
      isStatusModalOpen: true,
    })
  },

  // TODO: ACCIÓN PARA REINICIAR UN NIVEL
  resetLevelState: () => {

    const levelData = get().levelData; // Obtén el nivel actual
    const createPlayerBoards = Array.from({ length: levelData.boards }).map((_, index) => ({
      id: index + 1,
      board: generateBoard(), // Genera un tablero para cada jugador
    }));



    const createBotBoards = levelData.bots.map((bot, botIndex) => ({
      name: bot.name, // El nombre del bot
      boards: Array.from({ length: bot.boards }).map((_, boardIndex) => ({
        id: createIdBoard(botIndex, boardIndex), // ID único para cada tablero
        board: generateBoard(), // Genera un tablero nuevo
      })),
    }));

    // console.log(createBotBoards)

    const initialSelectedNumbersAndPositions = Array.from({ length: levelData.boards }).map((_, index) => (
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
      playerBoards: createPlayerBoards,

      botBoards: createBotBoards,

      currentTargets: [],
      currentRound: 0,
      winner: 'none',
      excludedTargets: [],
      markedCells: initialSelectedNumbersAndPositions,

      isStatusModalOpen: true,
      modal: START_LEVEL_MODAL
    })

    set({
      currentBoard: get().playerBoards?.find(b => b.id === 1) || { id: 0, board: [] },
      confirmedWinners: {},
      gameEnded: false,
      powerups: initialPowerups,
      timeoutsIds: [],
      findedCells: [],
    })

    get().changeMusic(levelData.music)

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
      botSelectedNumbersAndPositions: botInitialSelectedNumbersAndPositions,
    })

    get().clearAllBotTimeouts()
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
      timeoutsIds: [],
      findedCells: [],
      botSelectedNumbersAndPositions: [],
    })

    get().clearAllBotTimeouts()
  },

  closeStatusModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      isStatusModalOpen: false,
    })
  },

  openStatusModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      isStatusModalOpen: true
    })
  },

  noMoreRoundModal: () => {

    console.log("SE ACABARON LOS TURNOS")
    get().playSound(DEFEAT_SOUND)
    set(() => ({
      gameEnded: true, // ✅ Termina el juego
    }));

    set({
      modal: NO_MORE_ROUNDS_MODAL,
      isStatusModalOpen: true
    })

    get().changeMusic(ANYMORE_ENDING)

  },

  openResetLevelModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      modal: RESET_LEVEL_MODAL,
      isStatusModalOpen: true
    })
  },
});