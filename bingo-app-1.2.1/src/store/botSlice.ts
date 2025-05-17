import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { MusicSliceType } from "./musicSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, SelectedNumbersAndPositions } from "../types";
import { CORRECT_SOUND } from "../constants/audioSettings";

export type BotSliceType = {
  botBoards: BotBoards,
  botSelectedNumbersAndPositions: SelectedNumbersAndPositions,
  timeoutsIds: number[],
  findedCells: SelectedNumbersAndPositions, // TODO: CREAR UN NUEVO TYPE
  checkSelectedNumberBot: (idBoard: number, position: number) => boolean,
  markCellBot: (idBoard: number, number: number, position: number) => void
  checkWinnerPatternBot: () => boolean,
  // Tableros generados
  // Registro de posiciones y numeros marcadaos
  // Verificar si el numero ya fue marcado
  // Marcar un numero del tablero del bot
  // Verificar si el bot ha ganado (demora de 5000 milisegundos)
};





export const botSlice: StateCreator<BotSliceType & LevelSliceType & MusicSliceType & GameSliceType, [], [], BotSliceType> = (set, get) => ({
  botBoards: [],
  botSelectedNumbersAndPositions: [],
  timeoutsIds: [],
  findedCells: [],
  checkSelectedNumberBot: (idBoard: number, position: number) => {

    const isSelected = get().botSelectedNumbersAndPositions.some(
      (b) => b.id === idBoard && b.board.some((e) => e.position === position)
    );

    if (isSelected) {
      console.log('ESE NUMERO YA FUE MARCADO');
    } else {
      console.log('ESE NUMERO NO HA SIDO MARCADO');
    }

    return isSelected;

  },

  // EL BOT DEBE SER CAPAZ DE IDENTIFICAR EL NUMERO OBJETIVO EN SU TABLERO

  // SI EL NUMERO YA FUE MARCADO, NO LO DEBE MARCAR OTRA VEZ


  markCellBot: (idBoard: number, number: number, position: number) => {
    if (get().currentTargets.includes(number) &&
      !get().botSelectedNumbersAndPositions.some(
        (b) => b.id === idBoard && b.board.some((e) => e.position === position)
      )) {

      get().playSound(CORRECT_SOUND)
      set({

        botSelectedNumbersAndPositions: get().botSelectedNumbersAndPositions.map(b => {
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

    }




    return null;


  },

  checkWinnerPatternBot: () => {
    return true
  }
})
