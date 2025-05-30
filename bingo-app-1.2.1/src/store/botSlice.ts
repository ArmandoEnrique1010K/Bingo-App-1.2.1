import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { AudioSliceType } from "./audioSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoards, BotsWinners, } from "../types";
import { CORRECT_BOT_SOUND, DEFEAT_SOUND, ANYMORE_ENDING, } from "../constants/audioSettings";
import { dynamicInterval } from "../utils/dynamicInterval";
import { DEFEAT_MODAL } from '../constants/statusModalsText';

export type BotSliceType = {
  botWinner: () => void,
  botBoards: BotBoards,
  // botSessionIds: Record<string, number>,
  timeoutsIdsByBot: Record<string, number[]>,

  botSelectedNumbersAndPositions: BotBoards,
  timeoutsIds: number[],
  findedCells: BotBoards,
  checkSelectedNumberBot: (name: string, position: number) => boolean,
  markCellBot: (name: string, interval: number) => void
  checkWinnerPatternBot: () => BotsWinners
  updateBotSelection: (name: string, id: string, number: number, position: number) => void
  findNumbersOnBoards: (numbers: number[]) => void
  confirmedWinners: { [key: string]: boolean };
  gameEnded: boolean;
  setConfirmedWinner: (botId: string, boardId: string) => void;
  declareBotWinner: (botId: string) => void;
  currentSessionId: number
  clearAllBotTimeouts: () => void
};

export const botSlice: StateCreator<BotSliceType & LevelSliceType & AudioSliceType & GameSliceType, [], [], BotSliceType> = (set, get) => ({
  currentSessionId: 0,
  timeoutsIdsByBot: {} as Record<string, number[]>,
  botWinner: () => {
    set({
      winner: get().checkWinnerPatternBot() !== null ? 'bot' : '',
      modal: DEFEAT_MODAL,
      isStatusModalOpen: true,
      timeoutsIds: [],
      findedCells: [],
    });

    get().playSound(DEFEAT_SOUND)
    get().changeMusic(ANYMORE_ENDING)
  },

  botBoards: [],
  botSelectedNumbersAndPositions: [],
  timeoutsIds: [],
  findedCells: [],

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
    // const sessionId = Date.now();
    // set(state => ({
    //   botSessionIds: {
    //     ...state.botSessionIds,
    //     [name]: sessionId
    //   }
    // }));

    // const getSessionId = () => get().botSessionIds[name];

    // // Cancelar timeouts anteriores
    // get().timeoutsIds.forEach(id => clearTimeout(id));
    // set({ timeoutsIds: [] });

    const botFinded = get().findedCells.find(bot => bot.name === name);
    if (!botFinded || get().winner !== "none" || get().gameEnded) return;

    // Limpiar timeouts ANTERIORES SOLO para este bot
    const previous = get().timeoutsIdsByBot[name] || [];
    previous.forEach(id => clearTimeout(id));
    set(state => ({
      timeoutsIdsByBot: {
        ...state.timeoutsIdsByBot,
        [name]: []
      }
    }));


    const newTimeouts: number[] = [];

    for (const board of botFinded.boards) {
      for (const [idx, cell] of board.board.entries()) {
        if (get().gameEnded || get().winner !== "none") return;

        const dynamicTime = dynamicInterval();
        const time = interval * dynamicTime * (idx + 1);

        const timeoutId = setTimeout(() => {
          if (get().gameEnded || get().winner !== "none") return;

          console.log(`El bot ${botFinded.name} ha marcado en el tablero ${board.id} el número ${cell.number}`);
          get().updateBotSelection(name, board.id, cell.number, cell.position);
          get().playSound(CORRECT_BOT_SOUND);
        }, time);

        newTimeouts.push(timeoutId);
      }
    }

    // Guardar timeouts SOLO para este bot
    set(state => ({
      timeoutsIdsByBot: {
        ...state.timeoutsIdsByBot,
        [name]: newTimeouts
      }
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

    return winners;
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
  },

  confirmedWinners: {},
  gameEnded: true,

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
  clearAllBotTimeouts: () => {
    const all = get().timeoutsIdsByBot;
    Object.values(all).flat().forEach(id => clearTimeout(id));
    set({ timeoutsIdsByBot: {} });
  },
})
