import { StateCreator } from "zustand";
import { PlayerSliceType } from "./playerSlice";

import { Modal } from "../types";
import { generateTargets } from "../utils/generateTargets";
import { LevelSliceType } from "./levelSlice";
import { generateBoard } from "../utils/Board/generateBoard";
import { AudioSliceType } from "./audioSlice";
import { EXIT_MODAL, NO_MORE_ROUNDS_MODAL, NONE_MODAL, RESET_LEVEL_MODAL, START_LEVEL_MODAL } from "../constants/statusModalsText";
import { DEFAULT_TARGETS, MAX_TURNS, TARGET_GENERATION_DELAY } from "../constants/defaultConfigs";
import { BALLS_SOUND, CLICK_SOUND, DEFEAT_SOUND, KILL } from "../constants/audioSettings";
import { BotSliceType } from "./botSlice";
import { PowerUpSliceType } from "./powerUpSlice";

export type GameSliceType = {
  currentTargets: number[],
  excludedTargets: number[],
  currentRound: number,

  // Ventana modal
  modal: Modal,
  viewStatusModal: boolean,
  changeStatusModal: (modal: Modal) => void,
  closeStatusModal: () => void,
  openStatusModal: () => void,

  updateTargets: () => void,
  winner: string
  changeWinner: (value: string) => void;

  exitLevelModal: () => void;
  resetLevel: () => void;
  noMoreRoundModal: () => void;
  resetLevelModal: () => void;

  showCreditsModal: boolean,
  openCreditsModal: () => void,
  closeCreditsModal: () => void,

  showHelpModal: boolean,
  openHelpModal: () => void,
  closeHelpModal: () => void,

};



export const gameSlice: StateCreator<GameSliceType & PlayerSliceType & LevelSliceType & AudioSliceType & BotSliceType & PowerUpSliceType, [], [], GameSliceType> = (set, get) => ({
  currentTargets: [],
  excludedTargets: [],
  currentRound: 0,

  modal: NONE_MODAL,
  viewStatusModal: false,
  changeStatusModal: (modal) => {
    set({
      modal: modal,
      viewStatusModal: true
    });
  },


  updateTargets: () => {
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
  changeWinner: (value) => {
    set({ winner: value });
  },

  exitLevelModal: () => {
    get().playSound(CLICK_SOUND)

    set({
      modal: EXIT_MODAL,
      viewStatusModal: true,
    })
  },

  // const newBoards = useMemo(() => {
  //   if (winner === "none") {
  //     return Array.from({ length: levelData.boards }).map((_, index) => ({
  //       id: index + 1,
  //       board: generateBoard(),
  //     }));
  //   } else {
  //     return [];
  //   }
  // }, [winner]);


  resetLevel: () => {


    const levelData = get().levelData; // Obtén el nivel actual
    const createPlayerBoards = Array.from({ length: levelData.boards }).map((_, index) => ({
      id: index + 1,
      board: generateBoard(), // Genera un tablero para cada jugador
    }));

    // const createBotBoards = Array.from({ length: levelData.bots.length }).map((_, index) => ({
    //   id: index + 1,
    //   board: generateBoard(), // Genera un tablero para cada jugador
    // }));


    // const createBotBoards = levelData.bots.map((bot, botIndex) =>
    //   Array.from({ length: bot.boards }).map((_, boardIndex) => ({
    //     // id: `Bot-${botIndex}-${boardIndex}`,
    //     name: `Bot-${botIndex}-${boardIndex}`,
    //     // (10 * (botIndex + 1)) + (boardIndex + 1), // Identificador único combinando el id del bot y del tablero
    //     board: generateBoard(), // Genera un tablero para cada instancia
    //   }))
    // );


    const createBotBoards = levelData.bots.map((bot, botIndex) => ({
      name: bot.name, // El nombre del bot
      boards: Array.from({ length: bot.boards }).map((_, boardIndex) => ({
        id: `Bot-${botIndex}-${boardIndex}`, // ID único para cada tablero
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


    // [
    //   {
    //     id: "0",
    //     board: [{
    //       position: 13,
    //       number: 0
    //     }]
    //   }
    // ]


    set({
      playerBoards: createPlayerBoards,

      botBoards: createBotBoards, // TODO: INTENTAR ESTO

      currentTargets: [],
      currentRound: 0,
      winner: 'none',
      excludedTargets: [],
      selectedNumbersAndPositions: initialSelectedNumbersAndPositions,
      // MODAL

      viewStatusModal: true,
      modal: START_LEVEL_MODAL
    })

    set({
      currentBoard: get().playerBoards?.find(b => b.id === 1) || { id: 0, board: [] },
      confirmedWinners: {},
      gameEnded: false
    })

    get().changeMusic(levelData.music)
    // get().stopMusic()
    // get().startMusic(levelData.music);

    // Marcar las posiciones iniciales de los tableros del bot
    // Inicializa `botSelectedNumbersAndPositions` si está vacío

    // TYPES RELACIONADOS A LOS BOTS
    // export type BotBoard = {
    //   id: string,
    //   board: {
    //     position: number,
    //     number: number
    //   }[]
    // }

    // export type BotBoards = {
    //   name: string; // Nombre del bot
    //   boards: BotBoard[]; // Lista de tableros del bot
    // }[];


    // Construye botInitialSelectedNumbersAndPositions según el tipo BotBoards
    // BotBoards = { name: string; boards: BotBoard[]; }[]
    // BotBoard = { id: string, board: { position: number, number: number }[] }

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
    // console.log(get().botBoards)
    // console.log(botInitialSelectedNumbersAndPositions)

    set({
      botSelectedNumbersAndPositions: botInitialSelectedNumbersAndPositions,
    })

  },
  closeStatusModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      viewStatusModal: false,
    })
  },

  openStatusModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      viewStatusModal: true
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
      viewStatusModal: true
    })

    get().changeMusic(KILL)
    // get().stopMusic()
    // get().startMusic(KILL)

  },

  resetLevelModal: () => {

    get().playSound(CLICK_SOUND)

    set({
      modal: RESET_LEVEL_MODAL,
      viewStatusModal: true
    })
  },

  showCreditsModal: false,
  openCreditsModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      showCreditsModal: true
    })
  },
  closeCreditsModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      showCreditsModal: false
    })
  },

  showHelpModal: false,
  openHelpModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      showHelpModal: true
    })
  },
  closeHelpModal: () => {
    get().playSound(CLICK_SOUND)
    set({
      showHelpModal: false
    })
  },

});