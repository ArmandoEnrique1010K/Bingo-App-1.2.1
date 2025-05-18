import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { MusicSliceType } from "./musicSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, BotSelectedNumbersAndPositions, FindedCells } from "../types";

export type BotSliceType = {
  botBoards: BotBoards,
  botSelectedNumbersAndPositions: BotSelectedNumbersAndPositions,
  timeoutsIds: number[],
  findedCells: FindedCells, // TODO: CREAR UN NUEVO TYPE
  checkSelectedNumberBot: (id: string, position: number) => boolean,
  markCellBot: (id: string, number: number, position: number) => boolean
  checkWinnerPatternBot: () => boolean,
  // Tableros generados
  // Registro de posiciones y numeros marcadaos
  // Verificar si el numero ya fue marcado
  // Marcar un numero del tablero del bot
  // Verificar si el bot ha ganado (demora de 5000 milisegundos)

  updateFindedCells: (newResult: FindedCells) => void
  resetFindedCells: () => void
  updateBotSelection: (id: string, number: number, position: number) => void
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
  markCellBot: (id: string, number: number, position: number) => {

    if (get().currentTargets.includes(number)) {

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


      console.log(`El bot ${id} ha encontrado el número ${number} en la posición ${position}`);

      // TODO: DEBERIA MANTENER LOS NUMEROS SELECCIONADOS
      set({ botSelectedNumbersAndPositions: updatedBots });
      return true
    }
    return false
  },

  checkWinnerPatternBot: () => {
    return true
  },

  updateFindedCells: (newResult: FindedCells) => {
    set({ findedCells: newResult })
  },

  resetFindedCells: () => {
    set({ findedCells: [] })
  },

  updateBotSelection: (id, number, position) => {
    set((state) => ({
      botSelectedNumbersAndPositions: state.botSelectedNumbersAndPositions.map((bot) =>
        bot.id === id
          ? {
            ...bot,
            board: bot.board.some((cell) => cell.position === position)
              ? bot.board // No lo agregues si ya existe
              : [...bot.board, { position, number }],
          }
          : bot
      ),
    }));
  },

})
