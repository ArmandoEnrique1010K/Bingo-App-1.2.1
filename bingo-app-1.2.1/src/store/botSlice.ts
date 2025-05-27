import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { AudioSliceType } from "./audioSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, BotsWinners, } from "../types";
import { CORRECT_BOT_SOUND, DEFEAT_SOUND, ANYMORE_ENDING, } from "../constants/audioSettings";
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
  checkWinnerPatternBot: () => BotsWinners
  //   {
  //   botName: string,
  //   boardId: string,
  //   markedCells: {
  //     position: number,
  //     number: number
  //   }[],
  //   winningPattern: Pattern,
  //   reactionTime: number
  // }[],
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

export const botSlice: StateCreator<BotSliceType & LevelSliceType & AudioSliceType & GameSliceType, [], [], BotSliceType> = (set, get) => ({
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
      },
      timeoutsIds: [],
      findedCells: [],
    });

    get().playSound(DEFEAT_SOUND)
    get().changeMusic(ANYMORE_ENDING)
    // get().stopMusic()
    // get().startMusic(ANYMORE_ENDING)
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


  // ESTA ACCIÓN DEBE ENCARGARSE DE MARCAR LOS NUMEROS EN LOS TABLEROS DEL BOT, DEBE EVALUAR CADA BOT, TAMBIEN DEBE TOMAR EL INTERVALO DE TIEMPO DE DEMORA O DE REACCIÓN

  // TODO: PERO SI LOS NUMEROS OBJETIVOS ESTA VACIO, DEBE PARAR DE EJECUTAR LA FUNCIÓN MARKCELLBOT Y DETENER LOS TEMPORIZADORES
  markCellBot: (name: string, interval: number) => {

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

        if (get().winner === "bot") return
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

          // TODO: AQUI ESTABA EL PROBLEMA, LO ARREGLE, PERO SI gameEnded es true imprime el mensaje "No se van a seguir evaluando"
          if (get().gameEnded === false) {
            console.log(`El bot ${botFinded.name} ha marcado en el tablero ${board.id} el número ${cell.number} en la posición ${cell.position}, se demoro ${time} milisegundos`)
            get().updateBotSelection(name, board.id, cell.number, cell.position);
            get().playSound(CORRECT_BOT_SOUND)
          } else {
            // TODO: PERO SI gameEnded es false (AL MOMENTO DE REINICIAR EL NIVEL) VOLVERA A SEGUIR MARCANDO LOS NUMEROS, NO DEBERIA SEGUIR EVALUANDO
            console.log("No se van a seguir evaluando")

            // TODO: PROBABLEMENTE LA SOLUCIÓN SEA colocar gameEnded en true al momento de cerrar de nivel
            return
          }
        }, time);

        newTimeouts.push(timeoutId);

      });
    });
    // Guardar el id del timeout para posible limpieza

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
              // winningPattern: pattern,
              // DEBERIA DEVOLVER EL TIEMPO DE REACCION DEL BOT
              reactionTime: levelData.bots.find(b => b.name === bot.name)?.reactionTime || 0
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


  // TODO: AL REINICIAR UN NIVEL, EL BOT DEBE DEJAR DE SEGUIR MARCANDO
})
