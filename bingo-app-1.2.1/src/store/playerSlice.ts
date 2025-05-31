import { StateCreator } from "zustand";
import { GameSliceType, } from './gameSlice';
import { LevelSliceType } from "./levelSlice";
import { Board, Boards, MarkedCells } from "../types";
import { AudioSliceType } from "./audioSlice";
import { FINAL_LEVEL_VICTORY_MODAL, VICTORY_MODAL } from "../constants/statusModalsText";
import { FINAL_LEVEL } from "../constants/defaultConfigs";
import { CORRECT_SOUND, VICTORY_SOUND, DARKNESS_SOLO, WRONG_SOUND } from "../constants/audioSettings";
import { BotSliceType } from "./botSlice";

export type PlayerSliceType = {
  playerBoards: Boards,
  markedCells: MarkedCells,
  currentBoard: Board,
  setCurrentBoard: (id: number) => void,
  hasWinnerPattern: () => boolean,
  isCellMarked: (idBoard: number, position: number) => boolean,
  selectCell: (idBoard: number, number: number, position: number) => void
}

export const playerSlice: StateCreator<PlayerSliceType & GameSliceType & LevelSliceType & AudioSliceType & BotSliceType, [], [], PlayerSliceType> = (set, get) => ({
  playerBoards: [],
  markedCells: [],
  currentBoard: { id: 0, board: [] },

  setCurrentBoard: (id: number) => {
    set({
      currentBoard: get().playerBoards.find(b => b.id === id)
    })
  },

  hasWinnerPattern: () => {
    for (const b of get().markedCells) {
      if (get().levelData.patterns.some((p: number[]) => p.every(n => b.board.some(e => e.position === n)))) {
        set({
          currentTargets: [],
          winner: 'player',
          gameEnded: true,
          modal: get().levelData.level !== FINAL_LEVEL ? VICTORY_MODAL : FINAL_LEVEL_VICTORY_MODAL,
          isStatusModalOpen: true,
        })

        if (get().levelData.level !== FINAL_LEVEL) {
          get().unlockLevel(get().levelData.level + 1)
        }
        get().resetBotTimeouts()

        get().playSound(VICTORY_SOUND)
        get().changeMusic(DARKNESS_SOLO)

        return true
      } else {
        get().playSound(WRONG_SOUND)
      }
    }

    return false;
  },

  isCellMarked: (idBoard: number, position: number) => {
    return get().markedCells.some(
      (b) => b.id === idBoard && b.board.some((e) => e.position === position)
    );
  },

  selectCell: (idBoard, number, position) => {
    if (get().currentTargets.includes(number) &&
      !get().isCellMarked(idBoard, position)
    ) {
      set({
        markedCells: get().markedCells.map(b => {
          if (b.id === idBoard) {
            return {
              ...b,
              board: [
                ...b.board,
                {
                  position,
                  number,
                }
              ]
            }
          }
          return b
        })
      });

      get().playSound(CORRECT_SOUND)
    } else {
      get().playSound(WRONG_SOUND)
    }
  },
});