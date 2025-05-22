import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { MusicSliceType } from "./musicSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, } from "../types";
import { CORRECT_BOT_SOUND } from "../constants/audioSettings";

export type BotSliceType = {
  botBoards: BotBoards,
  botSelectedNumbersAndPositions: BotBoards,
  timeoutsIds: number[],
  findedCells: BotBoards, // TODO: CREAR UN NUEVO TYPE
  updateTimeoutsIds: (timeoutsIds: number[]) => void,
  checkSelectedNumberBot: (name: string, position: number) => boolean,
  markCellBot: (name: string, interval: number) => void
  checkWinnerPatternBot: () => boolean,
  // Tableros generados
  // Registro de posiciones y numeros marcadaos
  // Verificar si el numero ya fue marcado
  // Marcar un numero del tablero del bot
  // Verificar si el bot ha ganado (demora de 5000 milisegundos)

  updateFindedCells: (newResult: BotBoards) => void
  resetFindedCells: () => void
  updateBotSelection: (name: string, id: string, number: number, position: number) => void
  findNumbersOnBoards: (numbers: number[]) => void
};

export const botSlice: StateCreator<BotSliceType & LevelSliceType & MusicSliceType & GameSliceType, [], [], BotSliceType> = (set, get) => ({
  botBoards: [],
  botSelectedNumbersAndPositions: [],
  timeoutsIds: [],
  findedCells: [],
  updateTimeoutsIds: (timeoutsIds) => {
    set({
      timeoutsIds: [...timeoutsIds]
    })
  },


  checkSelectedNumberBot: (id: string, position: number) => {

    const isSelected = get().botSelectedNumbersAndPositions.some(
      (b) => b.name === id && b.boards.map(board => board.board.some((e) => e.position === position))
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

  // TODO: ESTA ACCIÓN DEBE ENCARGARSE DE MARCAR LOS NUMEROS EN LOS TABLEROS DEL BOT, DEBE EVALUAR CADA BOT, TAMBIEN DEBE TOMAR EL INTERVALO DE TIEMPO DE DEMORA O DE REACCIÓN
  // markCellBot: (name: string, number: number, position: number) => {

  //   if (get().currentTargets.includes(number)) {

  //     const updatedBots = get().botSelectedNumbersAndPositions.map(b => {
  //       if (b.name === name) {
  //         // Verifica si la posición ya está registrada
  //         const exists = b.boards.map(board => board.board.some(cell => cell.position === position));

  //         return exists ? b : {
  //           ...b,
  //           board: [...b.boards, { position, number }],
  //         };
  //       }
  //       return b;
  //     });

  //     // Obtener el nombre del bot
  //     // const bot = get().botBoards.find(bot => bot.name === name);
  //     // const botName = bot?.name ?? 'Desconocido';

  //     // QUISIERA OBTENER EL NOMBRE DEL BOT
  //     // Buscar el tablero donde se encontró el número
  //     const bot = get().botBoards.find(bot => bot.name === name);
  //     const boardWithNumber = bot?.boards.find(board =>
  //       board.board.some(cell => cell.position === position && cell.number === number)
  //     );
  //     const boardId = boardWithNumber?.id ?? 'Desconocido';

  //     console.log(`En el bot ${name}, en el tablero ${boardId} ha encontrado el número ${number} en la posición ${position}`);

  //     // TODO: DEBERIA MANTENER LOS NUMEROS SELECCIONADOS
  //     set({ botSelectedNumbersAndPositions: updatedBots });
  //     return true
  //   }
  //   return false
  // },

  markCellBot: (name: string, interval: number) => {
    // OBTENER LAS CÉLULAS ENCONTRADAS PARA EL BOT ESPECÍFICO
    const botFinded = get().findedCells.find(bot => bot.name === name);
    console.log(botFinded?.name)
    if (!botFinded) return;

    // Iterar sobre cada tablero y cada celda encontrada
    botFinded.boards.forEach(board => {
      board.board.forEach((cell, idx) => {

        // Usar setTimeout para simular el intervalo de reacción

        const timeoutId = setTimeout(() => {
          // Actualizar la selección del bot
          console.log(`El bot ${botFinded.name} ha encontrado en el tablero ${board.id} el número ${cell.number} en la posición ${cell.position}, se demoro ${interval * (idx + 1)} milisegundos`)
          get().updateBotSelection(name, board.id, cell.number, cell.position);
          get().playSound(CORRECT_BOT_SOUND)
        }, interval * (idx + 1)); // Multiplicar por idx para escalonar los intervalos

        // Guardar el id del timeout para posible limpieza
        set(state => ({
          timeoutsIds: [...state.timeoutsIds, timeoutId]
        }));
      });
    });
  },

  // DEBE ACTUALIZAR LAS POSICIONES Y NUMEROS SELECCIONADOS DEL BOT, LUEGO DE UN CIERTO INTERVALO







  checkWinnerPatternBot: () => {
    return true
  },

  updateFindedCells: (newResult: BotBoards) => {
    set({ findedCells: newResult })
  },

  resetFindedCells: () => {
    set({ findedCells: [] })
  },

  updateBotSelection: (name, id, number, position) => {
    set((state) => ({
      botSelectedNumbersAndPositions: state.botSelectedNumbersAndPositions.map((bot) =>
        bot.name === name
          ? {
            ...bot,
            boards: bot.boards.map(board =>
              board.id === id
                ? {
                  ...board,
                  board: board.board.some(cell => cell.position === position)
                    ? board.board // No lo agregues si ya existe
                    : [...board.board, { position, number }],
                }
                : board
            ),
          }
          : bot
      ),
    }));
  },


  findNumbersOnBoards: (numbers: number[]) => {

    set(state => ({
      findedCells: state.botBoards.map(bot => ({
        name: bot.name,
        boards: bot.boards.map(board => ({
          ...board,
          board: board.board.filter(cell => numbers.includes(cell.number))
        }))
      }))
    }))


    // console.log(numbers);
    // get().botBoards.map(b => b)



    // set((state) => ({
    //   botSelectedNumbersAndPositions: state.botSelectedNumbersAndPositions.map((bot) =>
    //     bot.name === name
    //       ? {
    //         ...bot,
    //         board: bot.boards.map(board => board.board.some((cell) => cell.position === position))
    //           ? bot.boards // No lo agregues si ya existe
    //           : [...bot.boards, { position, number }],
    //       }
    //       : bot
    //   ),
    // }));

  }
})
