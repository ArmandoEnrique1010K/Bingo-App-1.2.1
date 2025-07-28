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
  updateBoardPlayer: (idBoard: number, columnId: number, number: number, position: number) => void
  swapCells: (boardId: number, position1: number, position2: number) => void
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

  // Esta función es para actualizar el tablero, cuando se arrastra un numero de un tablero del bot a un tablero del jugador,
  // Debe intercambiar el numero y la posición del numero dependiendo de la columna del numero

  // columna 0: posiciones: 0,1,2,3,4


  // Si es la columna 0, el numero se debe intercambiar con el numero de la columna 0
  // Si es la columna 1, el numero se debe intercambiar con el numero de la columna 1
  // Si es la columna 2, el numero se debe intercambiar con el numero de la columna 2
  // Si es la columna 3, el numero se debe intercambiar con el numero de la columna 3
  // Si es la columna 4, el numero se debe intercambiar con el numero de la columna 4

  updateBoardPlayer: (idBoard: number, idColumn: number, number: number, position: number) => {

    console.log('ACTUALIZADO LAS COLUMNAS')

    set({
      playerBoards: get().playerBoards.map(b => {
        if (b.id === idBoard) {
          return {
            ...b,
            board: b.board.map((cell) => {
              if (cell.position === position) {
                return {
                  ...cell,
                  number,
                };
              }
              return cell;
            }),
          };
        }
        return b;
      }),
    });
  },


// Intercambiar celdas de una columna
swapCells: (boardId: number, position1: number, position2: number) => {
  set({
    playerBoards: get().playerBoards.map(b => {
      if (b.id === boardId) {
        // Encontrar los números en las posiciones
        const cell1 = b.board.find(c => c.position === position1);
        const cell2 = b.board.find(c => c.position === position2);
        
        if (!cell1 || !cell2) return b;

        // Intercambiar los números
        return {
          ...b,
          board: b.board.map(cell => {
            if (cell.position === position1) {
              return { ...cell, number: cell2.number };
            }
            if (cell.position === position2) {
              return { ...cell, number: cell1.number };
            }
            return cell;
          }),
        };
      }
      return b;
    }),
  });
},

});