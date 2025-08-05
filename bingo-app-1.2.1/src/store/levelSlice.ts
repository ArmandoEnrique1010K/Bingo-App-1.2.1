import { StateCreator } from "zustand";
import { Modal } from "../types";
import { AudioSliceType } from "./audioSlice";
import { ANYMORE_ENDING, BALLS_SOUND, CLICK_SOUND, DEFEAT_SOUND, } from "../constants/audioSettings";
import { EXIT_MODAL, NO_MORE_ROUNDS_MODAL, NONE_MODAL, RESET_LEVEL_MODAL, START_LEVEL_MODAL } from "../constants/statusModalsText";
import { DEFAULT_TARGETS, MAX_POWERUPS, MAX_TURNS, TARGET_GENERATION_DELAY } from "../constants/defaultConfigs";
import { generateTargets } from "../utils/generateTargets";
import { PowerUpSliceType } from "./powerUpSlice";
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
  selectedPowerUpsIds: number[],
  selectPowerUp: (id: number) => void,
  unSelectPowerUp: (id: number) => void,
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
  unlockedPowerUpsIds: [],
  // Si el numero de powerups desbloqueados es menor que 3, se seleccionan todos los powerups desbloqueados, de lo contrario no se seleccionan ninguno, el jugador debera seleccionar los powerups
  // selectedPowerUpsIds: get().unlockedPowerUpsIds.length > MAX_POWERUPS ? get().unlockedPowerUpsIds : [],
  selectedPowerUpsIds: [],
  selectPowerUp: (id: number) => {
    set({
      selectedPowerUpsIds: [...get().selectedPowerUpsIds, id]
    })
  },
  unSelectPowerUp: (id: number) => {
    set({
      selectedPowerUpsIds: get().selectedPowerUpsIds.filter((powerUpId) => powerUpId !== id)
    })
  },
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

        let newTargets: number[] = [];
        const forced = get().selectedForcedNumberObjective;
        const extra = get().extraTargets.active;
        const baseCount = DEFAULT_TARGETS;
        const excluded = get().excludedTargets;


        // AÑADIR LA LOGICA PARA EL POWERUP DE NUMERO ALEATORIO OBJETIVO
        // FORZAR GENERAR EL NUMERO '100'


        // ERROR ENCONTRADO: Si ambos powerups estan activos, genera 4 numeros objetivos, deberia generar 3
        // SOLUCION: 
        // 

        // TODO: AQUI DEBE ESTAR EL POWERUP DEL PATRON DE CRUZ
        // Si hay un número forzado, genera 1 menos
        // Si hay un numero aleatorio objetivo, genera 1 menos
        // Si ambos, genera 2 menos
        let count = forced !== 0 || get().randomNumberObjective.active
          ? (extra ? baseCount + 1 : baseCount - 1)
          : (extra ? baseCount + 2 : baseCount);

        // ERROR ENCONTRADO: Si ambos powerups estan activos, genera 4 numeros objetivos, deberia generar 3
        // SOLUCION: 
        // 
        if (forced !== 0 && get().randomNumberObjective.active) {
          count -= 1;
        }

        // Si el numero forzado es diferente de 0 (significa que se activo el powerup del patron de cruz y hay un numero forzado)
        // if (get().selectedForcedNumberObjective !== 0) {
        //   const newTargets = generateTargets(
        //     (get().extraTargets.active ? DEFAULT_TARGETS - 1 : 
        //     DEFAULT_TARGETS), 
        //     get().excludedTargets)
        // }

        // Generar objetivos (ya excluyendo el forzado si fuera necesario)
        newTargets = generateTargets(count, excluded);

        // const newTargets = generateTargets(
        //   // TODO: EL POWERUP DE AÑADIR 2 OBJETIVOS EXTRA
        //   get().extraTargets.active ?
        //     DEFAULT_TARGETS + 2 :
        //     DEFAULT_TARGETS

        //   , get().excludedTargets);


        // // TODO: AQUI DEBE ESTAR EL POWERUP DEL PATRON DE CRUZ
        // Añadir el número forzado si aplica
        if (forced !== 0) {
          newTargets.push(forced);
        }

        if (get().randomNumberObjective.active) {
          newTargets.push(100);
        }
        // set({
        //   currentTargets: newTargets,
        //   excludedTargets: [...get().excludedTargets, ...newTargets]
        // });

        // Actualizar estado
        set({
          currentTargets: newTargets,
          excludedTargets: [...excluded, ...newTargets],
          // Debe ser reiniciado el numero forzado
          selectedForcedNumberObjective: 0,
        })

        // TODO: ZONA DEL POWERUP DE MARCADO AUTOMATICO
        if (get().automaticMarkBoard.active) {
          get().findAllNumbersObjectiveInBoard(get().selectedBoardIdAutomaticMark);
        }
      }, TARGET_GENERATION_DELAY);
    }

    // TODO: ZONA DE POWERUPS
    if (get().extraTargets.active) {
      get().decrementExtraTargetsTurnsRemaining();
    }

    if (get().slowBots.active) {
      get().decrementSlowBotsTurnsRemaining();
    }

    if (get().viewAllBotBoards.active) {
      get().decrementViewAllBotBoardsTurnsRemaining();
    }

    if (get().automaticMarkBoard.active) {
      get().decrementAutomaticMarkBoardTurnsRemaining();
    }

    if (get().randomNumberObjective.active) {
      get().decrementRandomNumberObjectiveTurnsRemaining();
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
      foundCells: [],
      botMarkedCells: [],
      selectedPowerUpsIds: [],
    })
    get().resetDefaultPowerups()
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
      foundCells: [],
      markedCells: initialSelectedNumbersAndPositions,
      currentBoard: get().playerBoards?.find(b => b.id === 1) || { id: 0, board: [] },
      selectedPowerUpsIds: get().unlockedPowerUpsIds.length <= MAX_POWERUPS ? get().unlockedPowerUpsIds : [],
    })
    get().resetDefaultPowerups()
    get().resetBotTimeouts()
    get().changeMusic(music)
  },
});