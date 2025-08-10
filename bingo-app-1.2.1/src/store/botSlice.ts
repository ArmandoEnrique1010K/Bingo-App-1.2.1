import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { AudioSliceType } from "./audioSlice";
import { GameSliceType } from "./gameSlice";
import { BotBoard, BotBoards, BotsWinners, } from "../types";
import { CORRECT_BOT_SOUND, DEFEAT_SOUND, ANYMORE_ENDING, } from "../constants/audioSettings";
import { dynamicInterval } from "../utils/dynamicInterval";
import { DEFEAT_MODAL } from '../constants/statusModalsText';
import { PowerUpSliceType } from "./powerUpSlice";

export type BotSliceType = {
  botBoards: BotBoards,
  botMarkedCells: BotBoards,
  foundCells: BotBoards,
  botTimeoutsMap: Record<string, number[]>,
  confirmedWinners: { [key: string]: boolean };

  listOfBotsWinners: BotsWinners,
  declareBotWinnerGame: () => void,
  selectBotCell: (name: string, interval: number) => void
  checkWinnerPatternBot: () => void
  updateBotMarkedCell: (name: string, id: string, number: number, position: number) => void
  findNumbersOnBoards: (numbers: number[]) => void
  setConfirmedWinner: (botId: string, boardId: string) => void;
  // declareBotWinner: (botId: string) => void;
  resetBotTimeouts: () => void
};

export const botSlice: StateCreator<BotSliceType & LevelSliceType & AudioSliceType & GameSliceType & PowerUpSliceType, [], [], BotSliceType> = (set, get) => ({
  botBoards: [],
  botMarkedCells: [],
  foundCells: [],
  botTimeoutsMap: {} as Record<string, number[]>,
  confirmedWinners: {},

  listOfBotsWinners: [],
  declareBotWinnerGame: () => {
    set({
      showHelpModal: false,
      showCreditsModal: false,
      // winner: get().listOfBotsWinners.length > 0 ? 'bot' : '',
      winner: 'bot',
      modal: DEFEAT_MODAL,
      isStatusModalOpen: true,
      foundCells: [],
    });

    get().resetBotTimeouts()
    get().playSound(DEFEAT_SOUND)
    get().changeMusic(ANYMORE_ENDING)
  },


  selectBotCell: (name: string, interval: number) => {
    const botFinded = get().foundCells.find(bot => bot.name === name);
    if (!botFinded || get().winner !== "none" || get().gameEnded || get().currentTargets.length === 0) return;

    const previous = get().botTimeoutsMap[name] || [];
    previous.forEach(id => clearTimeout(id));
    set(state => ({
      botTimeoutsMap: {
        ...state.botTimeoutsMap,
        [name]: []
      }
    }));

    // POWERUP DE RALENTIZAR BOT
    const randomInterval = get().slowBots.active ? 3 : 1

    // 🔀 Mezclar aleatoriamente los números objetivos
    const shuffledTargets = [...get().currentTargets].sort(() => Math.random() - 0.5);
    const newTimeouts: number[] = [];

    for (const target of shuffledTargets) {  // ✅ Ahora los objetivos son aleatorios
      for (const board of botFinded.boards) {

        const cell = board.board.find(c => c.number === target); // ✅ Buscar solo la celda que contiene el número objetivo
        if (!cell) continue; // Si no existe en este tablero, pasa al siguiente objetivo

        if (get().gameEnded || get().winner !== "none") return;

        const dynamicTime = dynamicInterval();
        const time = interval * dynamicTime * (newTimeouts.length + 1);

        const timeoutId = setTimeout(() => {
          if (get().gameEnded || get().winner !== "none") return;

          // ✅ Ahora solo se marca el número en su tablero correspondiente
          get().updateBotMarkedCell(name, board.id, cell.number, cell.position);
          get().playSound(CORRECT_BOT_SOUND);

          // TODO: CONFIGURACION DEL POWERUP DE RALENTIZAR BOTS

          console.log(`El bot ${name}, se ha demorado ${time * randomInterval}ms para marcar el numero ${cell.number}`)

        }, time * randomInterval);

        newTimeouts.push(timeoutId);

      }
    }

    set(state => ({
      botTimeoutsMap: {
        ...state.botTimeoutsMap,
        [name]: newTimeouts
      }
    }));
  },

  // Acción para verificar si el bot ha encontrado un patrón,
  // Si ha encontrado, debe agregarlo a la lista de ganadores
  checkWinnerPatternBot: () => {
    const { levelData, botMarkedCells, listOfBotsWinners, killedBotName } = get();
    const { patterns, bots: levelBots } = levelData;

    const hasWinningPattern = (board: BotBoard) => {
      const markedPositions = board.board.map(cell => cell.position);
      return patterns.some(pattern =>
        pattern.every(pos => markedPositions.includes(pos))
      );
    };

    // 1️⃣ Filtrar ganadores actuales válidos
    let finalWinners = listOfBotsWinners.filter(winner => {
      const bot = botMarkedCells.find(b => b.name === winner.botName);
      if (!bot) return false;

      const board = bot.boards.find(b => b.id === winner.boardId);
      if (!board) return false;

      const botStillExists = levelBots.some(b => b.name === bot.name);
      return botStillExists && hasWinningPattern(board);
    });

    // 2️⃣ Agregar nuevos ganadores que no estén ya en la lista
    for (const bot of botMarkedCells) {
      for (const board of bot.boards) {
        if (hasWinningPattern(board)) {
          const alreadyWinner = finalWinners.some(
            w => w.botName === bot.name && w.boardId === board.id
          );

          if (!alreadyWinner) {
            finalWinners.push({
              botName: bot.name,
              boardId: board.id,
              markedCells: board.board,
              reactionTime:
                levelBots.find(b => b.name === bot.name)?.reactionTime || 0
            });
          }
        }
      }
    }

    // 3️⃣ Si hay un bot eliminado, quitarlo
    if (killedBotName && killedBotName.length > 0) {
      finalWinners = finalWinners.filter(w => !killedBotName.includes(w.botName));
    }

    // 4️⃣ Hacer un único set si hay cambios reales
    const hasChanged =
      finalWinners.length !== listOfBotsWinners.length ||
      finalWinners.some((w, i) => w.botName !== listOfBotsWinners[i]?.botName);

    if (hasChanged) {
      set({ listOfBotsWinners: finalWinners });
    }
  },

  updateBotMarkedCell: (name, id, number, position) => {
    set((state) => ({
      botMarkedCells: state.botMarkedCells.map((bot) =>
        bot.name === name
          ? {
            ...bot,
            boards: bot.boards.map(board =>
              board.id === id
                ? {
                  ...board,
                  board: board.board.some(cell => cell.position === position)
                    ? board.board
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
      foundCells: state.botBoards.map(bot => ({
        name: bot.name,
        boards: bot.boards.map(board => ({
          ...board,
          board: board.board.filter(cell => numbers.includes(cell.number))
        }))
      }))
    }))
  },


  setConfirmedWinner: (botId, boardId) => {

    console.log(`Estableciendo ganador del bot ${botId} porque tiene el patrón objetivo en el tablero ${boardId}`)
    set((state) => {
      const key = `${botId}-${boardId}`;
      if (!state.confirmedWinners[key] && !state.gameEnded) {
        return { confirmedWinners: { ...state.confirmedWinners, [key]: true } };
      }
      return state;
    });
  },

  // declareBotWinner: (botId) => {
  //   set(() => ({
  //     gameEnded: true,
  //   }));
  // },

  resetBotTimeouts: () => {
    const all = get().botTimeoutsMap;
    Object.values(all).flat().forEach(id => clearTimeout(id));
    set({ botTimeoutsMap: {} });
  },

})