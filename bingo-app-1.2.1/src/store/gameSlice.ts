import { StateCreator } from "zustand";
import { PlayerSliceType } from "./playerSlice";

import { Modal } from "../types";
import { generateTargets } from "../utils/generateTargets";
import { LevelSliceType } from "./levelSlice";
import { generateBoard } from "../utils/Board/generateBoard";
import { MusicSliceType } from "./musicSlice";
import { EXIT_MODAL, NO_MORE_ROUNDS_MODAL, NONE_MODAL, RESET_LEVEL_MODAL, START_LEVEL_MODAL } from "../constants/statusModalsText";
import { DEFAULT_TARGETS, MAX_TURNS, TARGET_GENERATION_DELAY } from "../constants/defaultConfigs";
import { BALLS_SOUND, CLICK_SOUND, DEFEAT_SOUND } from "../constants/audioSettings";

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



export const gameSlice: StateCreator<GameSliceType & PlayerSliceType & LevelSliceType & MusicSliceType, [], [], GameSliceType> = (set, get) => ({
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
        const newTargets = generateTargets(DEFAULT_TARGETS, get().excludedTargets);
        set({
          currentTargets: newTargets,
          excludedTargets: [...get().excludedTargets, ...newTargets]
        });
      }, TARGET_GENERATION_DELAY);
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

    // get().playSound(CLICK_SOUND)

    const levelData = get().levelData; // Obtén el nivel actual
    const playerBoards = Array.from({ length: levelData.boards }).map((_, index) => ({
      id: index + 1,
      board: generateBoard(), // Genera un tablero para cada jugador
    }));

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
      playerBoards: playerBoards,
      currentTargets: [],
      currentRound: 0,
      winner: 'none',
      excludedTargets: [],
      selectedNumbersAndPositions: initialSelectedNumbersAndPositions,
      currentBoard: get().playerBoards?.find(b => b.id === 1) || { id: 0, board: [] },
      // MODAL
      viewStatusModal: true,
      modal: START_LEVEL_MODAL
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
    set({
      modal: NO_MORE_ROUNDS_MODAL,
      viewStatusModal: true
    })
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