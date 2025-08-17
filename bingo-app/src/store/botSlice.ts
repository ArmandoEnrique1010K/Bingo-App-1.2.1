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
    // Bot encontrado
    const botFinded = get().foundCells.find(bot => bot.name === name);
    console.log(botFinded);

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

    // El numero objetivo aleatorio que marcara el bot
    // let randomNumber = 0;

    if (get().randomNumberObjective.turnsRemaining === 0 && get().randomNumberObjective.active) {
      // Numeros de los tableros del bot que aun no han sido marcados
      // const numbersNotMarked = get().botBoards
      //   .find(bot => bot.name === name)
      //   ?.boards.map(board => ({
      //     boardId: board.id,
      //     // Excluir aquellos que ya han sido marcados y tambien deberia excluir aquellos que esten en los numeros objetivo
      //     numbersNotMarked: board.board.filter(cell =>
      //       !get().botMarkedCells
      //         .find(bot => bot.name === name)
      //         ?.boards.find(b => b.id === board.id)
      //         ?.board.some(markedCell =>
      //           markedCell.number === cell.number &&
      //           markedCell.position === cell.position
      //         )
      //     )
      //   }));

      // De los numeros no marcados, excluir aquellos que esten en los numeros objetivo
      const tableroFiltrado = get().botBoards
        .find(bot => bot.name === name)
        ?.boards.map(board => ({
          boardId: board.id,
          // Excluir aquellos que ya han sido marcados y tambien deberia excluir aquellos que esten en los numeros objetivo
          numbersNotMarked: board.cells.filter(cell =>
            !get().botMarkedCells
              .find(bot => bot.name === name)
              ?.boards.find(b => b.id === board.id)
              ?.cells.some(markedCell =>
                markedCell.number === cell.number &&
                markedCell.position === cell.position
                || get().currentTargets.includes(cell.number)
              )
          )
        }));


      // Primero, aplanamos el arreglo de tableros a un solo arreglo de celdas no marcadas
      // con la información del tablero al que pertenecen
      const allUnmarkedCells = tableroFiltrado?.flatMap(board =>
        board.numbersNotMarked.map(cell => ({
          boardId: board.boardId,
          ...cell
        }))
      ) || [];

      // Luego seleccionamos un elemento aleatorio de este arreglo aplanado
      const randomCell = allUnmarkedCells.length > 0
        ? allUnmarkedCells[Math.floor(Math.random() * allUnmarkedCells.length)]
        : null;


      // Añadir en el estado de foundCells el numero aleatorio seleccionado, 
      // para que el bot marque el numero seleccionado
      // Debe buscarlo segun el valor de randomCell?.boardId


      // EJEMPLO DEL ESTADO DE foundCells (contiene las celdas de los numeros que han sido encontradas en cada uno de los tableros de cada bot)
      // {
      //   foundCells: [
      //     {
      //       name: 'Strategic-Bot-1',
      //       boards: [
      //         {
      //           id: 'Board-1-1',
      //           board: [
      //             {
      //               position: 1,
      //               number: 12
      //             }
      //           ]
      //         },
      //         {
      //           id: 'Board-1-2',
      //           board: [
      //             {
      //               position: 1,
      //               number: 12
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       name: 'Strategic-Bot-2',
      //       boards: [
      //         {
      //           id: 'Board-2-1',
      //           board: []
      //         }
      //       ]
      //     }
      //   ]
      // }

      // Después de obtener randomCell
      if (randomCell) {
        const { boardId, position, number } = randomCell;

        // Añadir a foundCells
        set(state => {
          // Buscar si ya existe el bot en foundCells
          const botIndex = state.foundCells.findIndex(bot => bot.name === name);

          if (botIndex === -1) {
            // Si el bot no existe en foundCells, lo creamos
            return {
              ...state,
              foundCells: [
                ...state.foundCells,
                {
                  name,
                  boards: [{
                    id: boardId,
                    cells: [{ position, number }]
                  }]
                }
              ]
            };
          } else {
            // Si el bot ya existe, actualizamos sus boards
            const updatedBots = [...state.foundCells];
            const bot = { ...updatedBots[botIndex] };
            const boardIndex = bot.boards.findIndex(b => b.id === boardId);

            if (boardIndex === -1) {
              // Si el tablero no existe, lo agregamos
              bot.boards = [
                ...bot.boards,
                {
                  id: boardId,
                  cells: [{ position, number }]
                }
              ];
            } else {
              // Si el tablero existe, agregamos la celda
              const board = { ...bot.boards[boardIndex] };

              // Verificar si la celda ya existe para no duplicar
              const cellExists = board.cells.some(
                cell => cell.position === position && cell.number === number
              );

              if (!cellExists) {
                board.cells = [...board.cells, { position, number }];
                bot.boards = [
                  ...bot.boards.slice(0, boardIndex),
                  board,
                  ...bot.boards.slice(boardIndex + 1)
                ];
                updatedBots[botIndex] = bot;
              }
            }

            return { foundCells: updatedBots };
          }
        });

        // Luego puedes proceder a marcar la celda
        get().updateBotMarkedCell(name, boardId, number, position);
        get().playSound(CORRECT_BOT_SOUND);
      }


    }
    // board.numbersNotMarked
    // .filter(cell => !get().currentTargets.includes(cell.number)));

    // De la constante anterior, obtener un numero aleatorio
    // const aleatoryNumber = numbersNotMarkedAndObjective?.map(board => board[Math.floor(Math.random() * board.length)]);

    // console.log(aleatoryNumber)


    // Si el powerup #9, randomNumberObjective, esta activo
    // SI EL NUMERO 100 ESTA EN LOS NUMEROS OBJETIVOS, SIGNIFICA QUE EL POWERUP DE NUMERO ALEATORIO OBJETIVO ESTA ACTIVO
    // if (get().currentTargets.includes(100)) {
    //   console.log('El powerup de numero aleatorio objetivo esta activo')
    //   console.log(`El bot ${name} podra marcar cualquier numero objetivo`)
    //   console.log(numbersNotMarked)
    //   console.log(tableroFiltrado)
    //   console.log(randomCell)
    //   console.log(botFinded);
    //   console.log(get().foundCells);
    //   // Debe tomar cualquier numero de los numeros objetivos
    //   // randomNumber = get().currentTargets[Math.floor(Math.random() * get().currentTargets.length)];
    // }



    for (const target of shuffledTargets) {  // ✅ Ahora los objetivos son aleatorios
      for (const board of botFinded.boards) {

        const cell = board.cells.find(c => c.number === target); // ✅ Buscar solo la celda que contiene el número objetivo
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
      const markedPositions = board.cells.map(cell => cell.position);
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
              markedCells: board.cells,
              victoryDelay:
                levelBots.find(b => b.name === bot.name)?.victoryDelay || 0
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
                  cells: board.cells.some(cell => cell.position === position)
                    ? board.cells
                    : [...board.cells, { position, number }],
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
          cells: board.cells.filter(cell => numbers.includes(cell.number))
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