import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { MusicSliceType } from "./musicSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, Pattern, } from "../types";
import { CORRECT_BOT_SOUND, DEFEAT_SOUND } from "../constants/audioSettings";
import { dynamicInterval } from "../utils/dynamicInterval";
import { DEFEAT_MODAL } from '../constants/statusModalsText';

export type BotSliceType = {
  botWinner: (name: string) => void,
  botBoards: BotBoards,
  botSelectedNumbersAndPositions: BotBoards,
  timeoutsIds: number[],
  findedCells: BotBoards,
  updateTimeoutsIds: (timeoutsIds: number[]) => void,
  checkSelectedNumberBot: (name: string, position: number) => boolean,
  markCellBot: (name: string, interval: number) => void
  checkWinnerPatternBot: () => {
    botName: string,
    boardId: string,
    markedCells: {
      position: number,
      number: number
    }[],
    winningPattern: Pattern,
  }[],
  // Tableros generados
  // Registro de posiciones y numeros marcadaos
  // Verificar si el numero ya fue marcado
  // Marcar un numero del tablero del bot
  // Verificar si el bot ha ganado (demora de 5000 milisegundos)

  // updateFindedCells: (newResult: BotBoards) => void
  resetFindedCells: () => void
  updateBotSelection: (name: string, id: string, number: number, position: number) => void
  findNumbersOnBoards: (numbers: number[]) => void
  dataBotWinner: {
    name: string
  },

  confirmedWinners: { [key: string]: boolean };
  gameEnded: boolean;
  setConfirmedWinner: (botId: string, boardId: string) => void;
  declareBotWinner: (botId: string) => void;


};

export const botSlice: StateCreator<BotSliceType & LevelSliceType & MusicSliceType & GameSliceType, [], [], BotSliceType> = (set, get) => ({
  dataBotWinner: {
    name: ""
  },
  botWinner: (name) => {
    set({
      // DEBE SER ESTRICTAMENTE DIFERENTE DE NULL Y NO IGUAL QUE TRUE
      winner: get().checkWinnerPatternBot() !== null ? 'bot' : '',
      modal: DEFEAT_MODAL,
      viewStatusModal: true,
      dataBotWinner: {
        name: name
      }
    });

    get().playSound(DEFEAT_SOUND)
  },

  botBoards: [],
  botSelectedNumbersAndPositions: [],
  timeoutsIds: [],
  findedCells: [],
  updateTimeoutsIds: (timeoutsIds) => {
    set({
      timeoutsIds: [...timeoutsIds]
    })
  },

  // EL BOT DEBE SER CAPAZ DE IDENTIFICAR EL NUMERO OBJETIVO EN SU TABLERO
  // SI EL NUMERO YA FUE MARCADO, NO LO DEBE MARCAR OTRA VEZ
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


  // TODO: ESTA ACCIÓN DEBE ENCARGARSE DE MARCAR LOS NUMEROS EN LOS TABLEROS DEL BOT, DEBE EVALUAR CADA BOT, TAMBIEN DEBE TOMAR EL INTERVALO DE TIEMPO DE DEMORA O DE REACCIÓN

  // TODO: PERO SI LOS NUMEROS OBJETIVOS ESTA VACIO, DEBE PARAR DE EJECUTAR LA FUNCIÓN MARKCELLBOT Y DETENER LOS TEMPORIZADORES
  markCellBot: (name: string, interval: number) => {

    // Limpiar timeouts anteriores
    // get().timeoutsIds.forEach(timeoutId => clearTimeout(timeoutId));
    // set({ timeoutsIds: [] });

    // if (get().currentTargets.length > 0) {
    //   get().timeoutsIds.forEach(timeoutId => clearTimeout(timeoutId));
    //   set({ timeoutsIds: [] });
    // }

    // OBTENER LAS CÉLULAS ENCONTRADAS PARA EL BOT ESPECÍFICO
    const botFinded = get().findedCells.find(bot => bot.name === name);
    // console.log(botFinded?.name)
    if (
      !botFinded ||
      (get().winner === "player" || get().winner === "bot")
      // || botFinded.boards.every(board => board.board.length === 0)
    ) return;

    const newTimeouts: number[] = [];

    // Iterar sobre cada tablero y cada celda encontrada
    botFinded.boards.forEach(board => {
      board.board.forEach((cell, idx) => {

        // Si los objetivos han cambiado, no crear más timeouts
        // if (!get().findedCells.find(bot => bot.name === name)) return;

        // Usar setTimeout para simular el intervalo de reacción
        const dynamicTime = dynamicInterval()
        // Multiplicar por idx para escalonar los intervalos
        const time = interval * dynamicTime * (idx + 1)

        const timeoutId = setTimeout(() => {

          // Verificar si los objetivos siguen existiendo antes de marcar
          // const stillExists = get().findedCells.find(bot =>
          //   bot.name === name &&
          //   bot.boards.some(b => b.id === board.id && b.board.some(c => c.position === cell.position))
          // );
          // if (!stillExists) return;

          // Actualizar la selección del bot
          console.log(`El bot ${botFinded.name} ha encontrado en el tablero ${board.id} el número ${cell.number} en la posición ${cell.position}, se demoro ${time} milisegundos`)
          get().updateBotSelection(name, board.id, cell.number, cell.position);
          get().playSound(CORRECT_BOT_SOUND)
        }, time);

        // Guardar el id del timeout para posible limpieza
        // set(state => ({
        //   timeoutsIds: [...state.timeoutsIds, timeoutId]
        // }));
        newTimeouts.push(timeoutId);

      });
    });

    set(state => ({
      timeoutsIds: [...state.timeoutsIds, ...newTimeouts]
    }));

  },

  // DEBE ACTUALIZAR LAS POSICIONES Y NUMEROS SELECCIONADOS DEL BOT, LUEGO DE UN CIERTO INTERVALO

  // TODO: ESTA FUNCIÓN DEBE VERIFICAR EN CADA MARCADO QUE HACE EL BOT SI TIENE EL PATRON GANADOR EN UNO DE SUS TABLEROS
  checkWinnerPatternBot: () => {
    const levelData = get().levelData;
    const patterns = levelData.patterns; // Array de arrays de posiciones ganadoras
    const botSelected = get().botSelectedNumbersAndPositions;
    const winners = [];


    // Recorre cada bot
    for (const bot of botSelected) {
      // Recorre cada tablero del bot
      for (const board of bot.boards) {
        const markedPositions = board.board.map(cell => cell.position);

        // Verifica cada patrón
        for (const pattern of patterns) {
          // const hasPattern = pattern.every(pos => markedPositions.includes(pos));
          // if (hasPattern) {
          //   // return true; // ¡Este tablero tiene un patrón ganador!

          //   // COMO PODRIA RETORNAR EL PATRON GANADOR EN LUGAR DE UN TRUE
          //   return {
          //     botName: bot.name,
          //     boardId: board.id,
          //     markedCells: board.board, // [{position, number}, ...]
          //     winningPattern: pattern,
          //   };
          // }

          if (pattern.every(pos => markedPositions.includes(pos))) {
            winners.push({
              botName: bot.name,
              boardId: board.id,
              markedCells: board.board,
              winningPattern: pattern
            });
          }

        }
      }
    }

    // return false; // Ningún tablero del bot tiene patrón ganador
    return winners; // Ningún tablero del bot tiene patrón ganador
  },

  // updateFindedCells: (newResult: BotBoards) => {
  //   set({ findedCells: newResult })
  // },

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

  },

  confirmedWinners: {},
  gameEnded: false,

  setConfirmedWinner: (botId, boardId) => {
    set((state) => {
      const key = `${botId}-${boardId}`;
      if (!state.confirmedWinners[key] && !state.gameEnded) { // ✅ Solo actualiza si el juego sigue activo
        return { confirmedWinners: { ...state.confirmedWinners, [key]: true } };
      }
      return state;
    });
  },

  declareBotWinner: (botId) => {
    set(() => ({
      gameEnded: true, // ✅ Termina el juego
    }));
    console.log(`🏆 ¡El bot ${botId} ha ganado! Fin del juego.`);
  },

})
