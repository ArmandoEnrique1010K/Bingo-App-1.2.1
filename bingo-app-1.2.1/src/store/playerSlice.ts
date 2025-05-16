import { StateCreator } from "zustand";
import { GameSliceType, } from './gameSlice';
import { LevelSliceType } from "./levelSlice";
import { Board, Boards, SelectedNumbersAndPositions } from "../types";
import { MusicSliceType } from "./musicSlice";
import { FINAL_LEVEL_VICTORY_MODAL, VICTORY_MODAL } from "../constants/statusModalsText";
import { FINAL_LEVEL } from "../constants/defaultConfigs";
import { CORRECT_SOUND, VICTORY_SOUND, WRONG_SOUND } from "../constants/audioSettings";

export type PlayerSliceType = {
  checkWinnerPattern: () => boolean,

  playerWinner: () => void

  // Tableros del jugador
  // Numeros y posiciones seleccionadas del tablero

  playerBoards: Boards,
  selectedNumbersAndPositions: SelectedNumbersAndPositions,
  currentBoard: Board,
  changeCurrentBoard: (id: number) => void,
  checkSelectedNumber: (idBoard: number, position: number) => boolean,
  markCell: (idBoard: number, number: number, position: number) => void

}


// type para selectedNumbersAndPositions
// export type SelectedNumbersAndPositions = {
//   id: number,
//   board: {
//     position: number[],
//     number: number[]
//   }[]
// }[]


export const playerSlice: StateCreator<PlayerSliceType & GameSliceType & LevelSliceType & MusicSliceType, [], [], PlayerSliceType> = (set, get) => ({
  playerBoards: [],
  selectedNumbersAndPositions: [],

  currentBoard: { id: 0, board: [] },

  changeCurrentBoard: (id: number) => {
    set({
      currentBoard: get().playerBoards.find(b => b.id === id)
    })
  },



  checkWinnerPattern: () => {
    for (const b of get().selectedNumbersAndPositions) {
      // const b: {
      //   id: number;
      //   board: {
      //     position: number;
      //     number: number;
      //   }[];
      // }


      // Debe comprobar que uno de los patrones ganadores (levelData.patterns) coincida con las posiciones marcadas del tablero del jugador
      if (get().levelData.patterns.some((p: number[]) => p.every(n => b.board.some(e => e.position === n)))) {
        set({
          currentTargets: [],
          winner: 'player',
          modal: VICTORY_MODAL,
          viewStatusModal: true,
        })

        // DEBE DESBLOQUEAR EL SIGUIENTE NIVEL
        if (get().levelData.level !== FINAL_LEVEL) {
          get().unlockLevel(get().levelData.level + 1)
        } else {
          console.log('USTED HA COMPLETADO EL ULTIMO NIVEL')
        }
        get().playSound(VICTORY_SOUND)

        return true
      } else {
        console.log('AUN NO HAY UN PATRON GANADOR')
        get().playSound(WRONG_SOUND)
      }
    }

    return false;
  },

  playerWinner: () => {
    set({
      winner: get().checkWinnerPattern() === true ? 'player ' : '',
      modal: get().levelData.level !== FINAL_LEVEL ? VICTORY_MODAL : FINAL_LEVEL_VICTORY_MODAL,
      viewStatusModal: true
    });
  },



  // PROBAR ESTO, VERIFICA SI EL NUMERO YA SE ENCUENTRA SELECCIONADO
  checkSelectedNumber: (idBoard: number, position: number) => {

    const isSelected = get().selectedNumbersAndPositions.some(
      (b) => b.id === idBoard && b.board.some((e) => e.position === position)
    );

    if (isSelected) {
      console.log('ESE NUMERO YA FUE MARCADO');
    } else {
      console.log('ESE NUMERO NO HA SIDO MARCADO');
    }

    return isSelected;


  },

  // AL HACER CLIC EN UN CUADRADO DEL TABLERO, DEBE MARCAR EL NUMERO SI NO SE ENCUENTRA SELECCIONADO
  markCell: (idBoard, number, position) => {
    // console.log(`Ha hecho clic en el tablero con el id ${idBoard}, la casilla tiene el número ${number} en la posición ${position}`)
    if (get().currentTargets.includes(number) &&
      !get().selectedNumbersAndPositions.some(
        (b) => b.id === idBoard && b.board.some((e) => e.position === position)
      )
      // !get().checkSelectedNumber(idBoard, position)
    ) {
      get().playSound(CORRECT_SOUND)

      set({

        selectedNumbersAndPositions: get().selectedNumbersAndPositions.map(b => {
          if (b.id === idBoard) {
            return {
              ...b,
              board: [
                ...b.board,
                {
                  position: position,
                  number: number,
                }
              ]
            }
          }

          return b
        })


      });


    } else {
      console.log('Ese no es el numero que coincide con uno de los objetivos')
      get().playSound(WRONG_SOUND)
      // console.log("REPRODUCIENDO SONIDO DE ERROR")
    }
  },


});