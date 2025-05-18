import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { MusicSliceType } from "./musicSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, BotSelectedNumbersAndPositions, FindedCells } from "../types";
import { CORRECT_SOUND } from "../constants/audioSettings";

export type BotSliceType = {
  botBoards: BotBoards,
  botSelectedNumbersAndPositions: BotSelectedNumbersAndPositions,
  timeoutsIds: number[],
  findedCells: FindedCells, // TODO: CREAR UN NUEVO TYPE
  checkSelectedNumberBot: (id: string, position: number) => boolean,
  markCellBot: (id: string, number: number, position: number) => void
  checkWinnerPatternBot: () => boolean,
  // Tableros generados
  // Registro de posiciones y numeros marcadaos
  // Verificar si el numero ya fue marcado
  // Marcar un numero del tablero del bot
  // Verificar si el bot ha ganado (demora de 5000 milisegundos)

  updateFindedCells: (newResult: FindedCells) => void
  resetFindedCells: () => void
};





export const botSlice: StateCreator<BotSliceType & LevelSliceType & MusicSliceType & GameSliceType, [], [], BotSliceType> = (set, get) => ({
  botBoards: [],
  botSelectedNumbersAndPositions: [],
  timeoutsIds: [],
  findedCells: [],
  checkSelectedNumberBot: (id: string, position: number) => {

    const isSelected = get().botSelectedNumbersAndPositions.some(
      (b) => b.id === id && b.board.some((e) => e.position === position)
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

  //  &&
  // !get().botSelectedNumbersAndPositions.some(
  //   (b) => b.id === id && b.board.some((e) => e.position === position)
  // )

  markCellBot: (id: string, number: number, position: number) => {

    if (get().currentTargets.includes(number)) {

      // Inicializa `botSelectedNumbersAndPositions` si está vacío



      const updatedBots = get().botSelectedNumbersAndPositions.map(b => {
        if (b.id === id) {
          // Verifica si la posición ya está registrada
          const exists = b.board.some(cell => cell.position === position);

          return exists ? b : {
            ...b,
            board: [...b.board, { position, number }],
          };
        }
        return b;
      });

      // TODO: EL PROBLEMA ES QUE UPDATEDBOTS SIEMPRE ES UN ARREGLO VACIO, PARECE QUE TIENE ALGO QUE VER CON botBoards

      console.log(updatedBots)

      get().playSound(CORRECT_SOUND);
      console.log(`El bot ${id} ha encontrado el número ${number} en la posición ${position}`);

      set({ botSelectedNumbersAndPositions: updatedBots });
    }



    // if (get().currentTargets.includes(number)) {

    //   get().playSound(CORRECT_SOUND)

    //   console.log(`El bot ${id} ha encontrado el número ${number} en la posicion ${position}`)
    //   set({

    //     // TODO: DEBERIA ACTUALIZAR LAS POSICIONES SELECCIONADAS DEL TABLERO DEL BOT
    //     botSelectedNumbersAndPositions: get().botSelectedNumbersAndPositions.map(b => {
    //       if (b.id === id) {
    //         return {
    //           ...b,
    //           id: id,
    //           board: [
    //             ...b.board,
    //             {
    //               position: position,
    //               number: number,
    //             }
    //           ]
    //         }
    //       }

    //       return b
    //     })


    //   });

    // }
  },

  checkWinnerPatternBot: () => {
    return true
  },

  updateFindedCells: (newResult: FindedCells) => {
    set({ findedCells: newResult })
  },

  resetFindedCells: () => {
    set({ findedCells: [] })
  }
})
