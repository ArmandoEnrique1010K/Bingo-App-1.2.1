import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { PlayerSliceType } from "./playerSlice";
import { GameSliceType } from "./gameSlice";
import { BotSliceType } from "./botSlice";
import { CORRECT_SOUND, WRONG_SOUND } from "../constants/audioSettings";
import { MAX_POWERUPS } from "../constants/defaultConfigs";
import { AudioSliceType } from "./audioSlice";
import { Boards, DetailsPowerUp, SwapNumberSelected } from "../types";

export type PowerUpSliceType = {
  // Definición de los powerups

  // Ralentizar bots
  slowBots: DetailsPowerUp;

  // Incrementar 2 números objetivos extra
  extraTargets: DetailsPowerUp;

  // Desmarcar un numero de un bot
  unmarkNumberBot: DetailsPowerUp;

  // Intercambiar posiciones de 2 números de un tablero
  swapNumbersBoard: DetailsPowerUp;


  // Forzar un numero objetivo de un patron de cruz
  forceNumberObjectiveCross: DetailsPowerUp;

  // Automarcar un tablero por 5 turnos
  automaticMarkBoard: DetailsPowerUp;

  // Marcar numeros vecinos (los numeros de la forma: X - 2, X - 1, X, X + 1 y X + 2). X es un numero en el tablero
  markNeighborgNumbers: DetailsPowerUp;

  // Ver todos los tableros de los bots por 5 turnos
  viewAllBotBoards: DetailsPowerUp;

  // Numero aleatorio objetivo
  randomNumberObjective: DetailsPowerUp;

  // Eliminar un bot del nivel permanentemente
  killBot: DetailsPowerUp;
  // Acciones de los powerups

  // Ralentizar bots
  activateSlowBots: () => void;
  decrementSlowBotsTurnsRemaining: () => void;

  // Incrementar 2 números objetivos extra
  activateExtraTargets: () => void;
  decrementExtraTargetsTurnsRemaining: () => void;

  // Desmarcar un numero de un bot
  activateUnmarkNumberBot: () => void;
  unmarkNumberBotOnNumberClick: (
    botName: string,
    idBoard: string,
    numberClicked: number
  ) => void;

  // Intercambiar posiciones de 2 números de un tablero
  swapNumbersSelected: { firstNumber: SwapNumberSelected | null, secondNumber: SwapNumberSelected | null };
  activateSwapNumbersBoard: () => void;
  selectNumbersFromSwapNumbersBoard: (firstNumberClicked: SwapNumberSelected, secondNumberClicked: SwapNumberSelected) => void;
  swapNumberBoardOnNumbersClicks: (
    firstNumberClicked: SwapNumberSelected,
    secondNumberClicked: SwapNumberSelected,
  ) => void;

  // Forzar un numero objetivo de un patron de cruz
  activateForceNumberObjectiveCross: () => void;
  activateForceNumberObjectiveCrossOnNumberClick: (
    boardId: number,
    number: number
  ) => void;
  selectedForcedNumberObjective: number;
  // // Automarcar un tablero por 5 turnos
  // toggleAutomaticMarkBoard: () => void;
  // activateAutomaticMarkBoardOnNumberClick: (
  //   boardId: number,
  //   numberClicked: number
  // ) => void;

  //   // Marcar numeros vecinos (los numeros de la forma: X - 2, X - 1, X, X + 1 y X + 2). X es un numero en el tablero
  activateMarkNeighborgNumbers: () => void;
  markNeighborgNumbersOnNumberClick: (
    boardId: number,
    numberClicked: number
  ) => void;

  // // Ver todos los tableros de los bots por 5 turnos
  activateViewAllBotBoards: () => void;
  decrementViewAllBotBoardsTurnsRemaining: () => void;

  // // Numero aleatorio objetivo
  // toggleRandomNumberObjective: () => void;
  // activateRandomNumberObjectiveOnNumberClick: (
  //   boardId: number,
  //   numberClicked: number
  // ) => void;

  // // Eliminar un bot del nivel permanentemente
  activateKillBot: () => void;
  killBotOnBotClick: (
    botName: string,
  ) => void;
  killedBotName: string;

  // Reiniciar los valores predeterminados de los powerups
  currentSelectPowerUpName: string;
  currentSelectPowerUpDescription: string;
  changeCurrentSelectPowerUp: (name: string, description: string) => void;
  togglePowerUp: (id: number) => void;
  cancelPowerUp: (id: number) => void;
  resetDefaultPowerups: () => void;
};

export const powerUpSlice: StateCreator<
  PowerUpSliceType &
  LevelSliceType &
  PlayerSliceType &
  GameSliceType &
  BotSliceType &
  AudioSliceType,
  [],
  [],
  PowerUpSliceType
> = (set, get) => ({
  slowBots: {
    type: 'continuous',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  extraTargets: {
    type: 'continuous',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  unmarkNumberBot: {
    type: 'oneTime',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  swapNumbersBoard: {
    type: 'oneTime',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  forceNumberObjectiveCross: {
    type: 'oneTime',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  automaticMarkBoard: {
    type: 'continuous',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  markNeighborgNumbers: {
    type: 'oneTime',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  viewAllBotBoards: {
    type: 'continuous',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  randomNumberObjective: {
    type: 'oneTime',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  killBot: {
    type: 'oneTime',
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  // Ralentizar bots
  activateSlowBots: () => {
    set((state) => ({
      slowBots: {
        ...state.slowBots,
        hasActivated: true,
        active: true,
        turnsRemaining: 5,
      },
    }));
  },

  decrementSlowBotsTurnsRemaining: () => {
    const { slowBots } = get();
    if (slowBots.active && slowBots.turnsRemaining > 0) {
      set((state) => ({
        slowBots: {
          ...state.slowBots,
          turnsRemaining: state.slowBots.turnsRemaining - 1,
        },
      }));
    } else {
      // Desactivar power-up si se acaba
      set((state) => ({
        slowBots: {
          ...state.slowBots,
          active: false,
          turnsRemaining: 0,
        },
      }));
    }
  },


  // Incrementar 2 números objetivos extra
  activateExtraTargets: () => {
    set({
      extraTargets: {
        ...get().extraTargets,
        hasActivated: true,
        active: true,
        turnsRemaining: 3,
      },
    });
  },

  decrementExtraTargetsTurnsRemaining: () => {
    const { extraTargets } = get();

    if (extraTargets.active && extraTargets.turnsRemaining > 0) {
      set({
        extraTargets: {
          ...extraTargets,
          turnsRemaining: extraTargets.turnsRemaining - 1,
        },
      });
    } else {
      // Desactivar power-up si se acaba
      set({
        extraTargets: {
          ...extraTargets,
          active: false,
          turnsRemaining: 0,
        },
      });
    }
  },

  // Desmarcar un numero del tablero del bot
  activateUnmarkNumberBot: () => {
    set((state) => ({
      unmarkNumberBot: {
        ...state.unmarkNumberBot,
        active: true,
        turnsRemaining: 1,
      },
    }));
  },

  // Este powerup solamente tiene un solo uso
  unmarkNumberBotOnNumberClick: (
    botName: string,
    idBoard: string,
    numberClicked: number
  ) => {
    const { botBoards, botMarkedCells, unmarkNumberBot } = get();

    // Verificación de power-up y objetivo
    if (!unmarkNumberBot.active) return;

    // TODO: CORREGIR AQUI
    // Encontrar el board correspondiente y buscar el numero objetivo en el tablero del bot
    const boardObj = botBoards.find((b) =>
      b.boards.find(
        (board) =>
          board.id === idBoard &&
          board.board.find((cell) => cell.number === numberClicked)
      )
    );
    if (!boardObj) return;

    const findedNumber = boardObj.boards
      .find((board) => board.id === idBoard)
      ?.board.find((cell) => cell.number === numberClicked);
    if (!findedNumber) return;
    console.log(findedNumber);


    // Imprimir los numeros marcados del tablero del bot seleccionado
    const markedNumbers = botMarkedCells
      .find((bot) => bot.name === botName)
      ?.boards.find((board) => board.id === idBoard)?.board;
    console.log(markedNumbers);

    // Eliminar del tablero del bot el numero marcado
    const updatedMarkedNumbers = markedNumbers?.filter(
      (cell) => cell.number !== numberClicked
    );
    console.log(updatedMarkedNumbers);

    // Actualizar el tablero del bot
    const updatedBotMarkedCells = botMarkedCells.map((bot) =>
      bot.name === botName
        ? {
          ...bot,
          boards: bot.boards.map((board) =>
            board.id === idBoard
              ? {
                ...board,
                board: board.board.filter(
                  (cell) => cell.number !== numberClicked
                ),
              }
              : board
          ),
        }
        : bot
    );
    console.log(updatedBotMarkedCells);

    set(() => ({
      botMarkedCells: updatedBotMarkedCells,
      unmarkNumberBot: {
        ...unmarkNumberBot,
        active: false,
        hasActivated: true,
        turnsRemaining: 0,
      },
    }));
  },

  activateSwapNumbersBoard: () => {
    set((state) => ({
      swapNumbersBoard: {
        ...state.swapNumbersBoard,
        // hasActivated: true,
        active: true,
        turnsRemaining: 1,
      },
    }));
  },

  swapNumbersSelected: { firstNumber: null, secondNumber: null },

  selectNumbersFromSwapNumbersBoard: (firstNumberClicked: SwapNumberSelected, secondNumberClicked: SwapNumberSelected) => {
    // Debe llamar 2 veces a la funcion swapNumberBoardOnNumbersClicks para asignar los numeros
    // console.log('Seleccionando numeros para intercambiar ' + number)
    // swapNumberBoardOnNumbersClicks(boardId, number, position);

    // Si no se ha seleccionado ningun numero
    if (!get().swapNumbersSelected.firstNumber) {
      set({
        swapNumbersSelected: {
          firstNumber: {
            id: firstNumberClicked!.id,
            number: firstNumberClicked!.number,
            position: firstNumberClicked!.position
          },
          secondNumber: null,
        },
      })
      console.log(`Seleccionando primer numero ${firstNumberClicked?.id} ${firstNumberClicked?.position} ${firstNumberClicked?.number}`)

    } else if (!get().swapNumbersSelected.secondNumber) {
      const updatedState = {
        firstNumber: get().swapNumbersSelected.firstNumber,
        secondNumber: {
          id: secondNumberClicked!.id,
          number: secondNumberClicked!.number,
          position: secondNumberClicked!.position
        },
      };

      console.log(`Seleccionando segundo numero ${secondNumberClicked!.id} ${secondNumberClicked!.position} ${secondNumberClicked!.number}`)

      // Si ha seleccionado el primer numero y luego vuelve hacer clic en el mismo numero, se debe deseleccionar
      if (get().swapNumbersSelected.firstNumber?.id === secondNumberClicked?.id &&
        get().swapNumbersSelected.firstNumber?.number === secondNumberClicked?.number &&
        get().swapNumbersSelected.firstNumber?.position === secondNumberClicked?.position) {
        set({
          swapNumbersSelected: {
            firstNumber: null,
            secondNumber: null,
          },
        });
        console.log(`Deseleccionando primer numero ${secondNumberClicked?.id} ${secondNumberClicked?.position} ${secondNumberClicked?.number}`)
        return;
      }


      // Error, el id de ambos tableros debe ser el mismo, de lo contrario no se puede intercambiar
      if (updatedState.firstNumber?.id !== updatedState.secondNumber?.id) {
        console.log(updatedState.firstNumber?.id)
        console.log(updatedState.secondNumber?.id)
        console.log(`Error, el id de ambos tableros debe ser el mismo, de lo contrario no se puede intercambiar`)
        return;
      }

      console.log(updatedState.firstNumber?.id)
      console.log(updatedState.secondNumber?.id)

      console.log(`Intercambiando numeros ${updatedState.firstNumber?.number} y ${updatedState.secondNumber?.number}`)

      // Actualizar el tablero del jugador
      const updatedBoards: Boards = get().playerBoards.map((board) =>
        board.id === updatedState.firstNumber?.id
          ? {
            ...board,
            // Intercambia el primer numero
            board: board.board.map((cell) => {
              if (cell.number === updatedState.firstNumber?.number && updatedState.secondNumber?.number !== undefined) {
                return { ...cell, number: updatedState.secondNumber.number };
              }

              // Intercambia el segundo numero
              if (cell.number === updatedState.secondNumber?.number && updatedState.firstNumber?.number !== undefined) {
                return { ...cell, number: updatedState.firstNumber.number };
              }
              return cell;
            })
          }
          : board
      );

      // console.log(updatedBoards)

      // Actualizar el tablero del jugador, sin agregar otros nuevos tableros
      set({
        playerBoards:
          // ...get().playerBoards,
          updatedBoards
      });




      // Actualizar las posiciones de los numeros seleccionados en el tablero
      const updateMarkedCells = get().markedCells.map((board) =>
        board.id === updatedState.firstNumber?.id
          ? {
            ...board,
            board: board.board.map((cell) => {
              if (cell.position === updatedState.firstNumber?.position &&
                cell.number === updatedState.firstNumber?.number &&
                updatedState.secondNumber?.position !== undefined) {
                return { ...cell, number: updatedState.firstNumber.number, position: updatedState.secondNumber.position };
              }

              // Intercambia el segundo numero
              if (cell.position === updatedState.secondNumber?.position &&
                cell.number === updatedState.secondNumber?.number &&
                updatedState.firstNumber?.position !== undefined) {
                return { ...cell, number: updatedState.secondNumber.number, position: updatedState.firstNumber.position };
              }
              return cell;
            })
          }
          : board
      );

      console.log(updateMarkedCells)

      set({
        markedCells: updateMarkedCells
      })

      // Opcional: reiniciar selección
      set({
        // Bloquear el powerup
        swapNumbersBoard: {
          ...get().swapNumbersBoard,
          active: false,
          hasActivated: true,
          turnsRemaining: 0,
        },

        // Reiniciar seleccion
        swapNumbersSelected: {
          firstNumber: null,
          secondNumber: null,
        },
      });
    }

    return; // Para evitar que se mezclen con otras lógicas de click

  },



  // Esta acción es la encargada de establecer 2 numeros en el tablero
  // Debe recibir el id del tablero, el primer numero y el segundo numero
  swapNumberBoardOnNumbersClicks: (firstNumberClicked: SwapNumberSelected, secondNumberClicked: SwapNumberSelected) => {

    const firstNumberData = firstNumberClicked
    const secondNumberData = secondNumberClicked

    // Actualizar el tablero del jugador, intercambiando los numeros
    const updatedPlayerBoards = get().playerBoards.map((board) =>
      board.id === firstNumberData?.id
        ? {
          ...board,
          // TODO: En cada celda, si la posicion es la misma que la del primer numero, se debe intercambiar
          board: board.board.map((cell) =>
            cell.number === firstNumberData?.number
              ? { ...cell, number: secondNumberData?.number }
              : cell
          ),
        }
        : board
    );

    console.log(updatedPlayerBoards)

    // set(() => ({
    //   playerBoards: get().updatedPlayerBoards,
    // }))
  },

  // PATRON DE CRUZ
  /****************** */
  activateForceNumberObjectiveCross: () => {
    set((state) => ({
      forceNumberObjectiveCross: {
        ...state.forceNumberObjectiveCross,
        // hasActivated: true,
        active: true,
        turnsRemaining: 1,
      },
    }));
  },

  selectedForcedNumberObjective: 0,

  activateForceNumberObjectiveCrossOnNumberClick: (boardId: number, numberClicked: number) => {
    console.log(boardId, numberClicked)

    // Si el numero seleccionado ya se encuentra en la lista de numeros marcados por tablero, no debe seguir
    const isNumberMarked = get().markedCells.some(
      (b) => b.id === boardId && b.board.some((e) => e.number === numberClicked)
    );


    if (isNumberMarked) {
      console.log('El numero ya se encuentra marcado')
      return;
    }

    // Obtener todos los números del tablero del jugador en el cual hizo clic
    const playerBoard = get().playerBoards.find((board) => board.id === boardId);
    // Ahora debe obtener la posición del numero seleccionado
    const positionNumber = playerBoard?.board.find((cell) => cell.number === numberClicked)?.position;

    // El patrón de cruz, el tablero tiene las siguientes posiciones
    /*
    1 6 11 16 21
    2 7 12 17 22
    3 8 13 18 23
    4 9 14 19 24
    5 10 15 20 25
    */

    // Por ejemplo, si el jugador ha hecho clic en un numero, cuya posición es el 18, se debe crear un nuevo
    // arreglo con los numeros de las posiciones 3, 8, 13, 18 (el mismo numero), 23, 16, 17, 19 y 20

    // Si fuera la posicion 1, debe tomar los numeros de las posiciones
    /*
    6
    11
    16
    21 
    2 3 4 5 */

    // Si fuera la posicion 2, debe tomar los numeros de las posiciones
    /*
    1
    7
    12
    17
    22
    1 3 4 5 6 */


    // ¿Qué operación debe realizar para obtener los numeros de las posiciones?
    const vertical = [];
    const horizontal = [];
    // En el eje X toma las posiciones que van de 5 en 5 en un intervalo del 1 al 25
    // Eje vertical (misma columna): centro +/- 5
    for (let i = 0; i < 5; i++) {
      const pos = positionNumber! % 5 === 0
        ? 5 * i + 5 // para columnas del 5
        : (positionNumber! % 5) + 5 * i;
      vertical.push(pos);
    }
    // En el eje Y toma las posiciones del 1 al 5 si la posición es un numero del 1 al 5
    // En el eje Y toma las posiciones del 6 al 10 si la posición es un numero del 6 al 10
    // En el eje Y toma las posiciones del 11 al 15 si la posición es un numero del 11 al 15
    // En el eje Y toma las posiciones del 16 al 20 si la posición es un numero del 16 al 20
    // En el eje Y toma las posiciones del 21 al 25 si la posición es un numero del 21 al 25
    // 🔹 Eje horizontal (misma fila): rangos de 5
    const rowStart = Math.floor((positionNumber! - 1) / 5) * 5 + 1;
    for (let i = 0; i < 5; i++) {
      horizontal.push(rowStart + i);
    }

    // 🔹 Unir y eliminar duplicados (positionNumber aparece dos veces)
    const allPositions = new Set([...vertical, ...horizontal]);
    const result = Array.from(allPositions);

    // Resultado: Un arreglo de posiciones
    console.log(result)

    // Ahora debera hacer una comparación
    // De markedCells (las cedulas marcadas por el jugador de un tablero por el mismo id)
    // Excluye las posiciones de los numeros que ya se encuentran marcados
    const markedCells = get().markedCells;

    // Primero debe buscar el tablero por el id y luego realizar la comparación
    const markedNumbers = markedCells.find((board) => board.id === boardId)?.board
      .filter((cell) => result.includes(cell.position))?.map((cell) => cell.number);


    const resultNumbers = result.map((pos) => playerBoard?.board.find((cell) => cell.position === pos)?.number);
    const unmarkedNumbers = resultNumbers.filter((num) => !markedNumbers?.includes(num!));

    // Debe imprimir los numeros que aun no se han marcado
    console.log(unmarkedNumbers)

    // Debe seleccionar un numero aleatorio de los numeros que aun no se han marcado
    const randomNumber = unmarkedNumbers[Math.floor(Math.random() * unmarkedNumbers.length)];
    console.log(randomNumber)


    // console.log(playerBoard)
    // console.log(positionNumber)

    // const arrayNumbers = [numberClicked]
    // console.log(arrayNumbers)


    // Ahora ese numero aleatorio sera el siguiente numero objetivo
    // Sera forzado a salir en los numeros objetivos
    set(() => ({
      forceNumberObjectiveCross: {
        ...get().forceNumberObjectiveCross,
        active: false,
        hasActivated: true,
        turnsRemaining: 0,
      },
      selectedForcedNumberObjective: randomNumber,
    }))

    // Aqui deberia almacenar el numero seleccionado para que a la siguiente ronda sea forzado

    console.log('HAGA CLIC EN SIGUIENTE NUMERO')

  },

  activateMarkNeighborgNumbers: () => {
    set((state) => ({
      markNeighborgNumbers: {
        ...state.markNeighborgNumbers,
        // Esta propiedad indica que el powerup ya ha sido activado, por lo que ya no se podra volver a activar
        hasActivated: true,
        active: !state.markNeighborgNumbers.active,
        turnsRemaining: !state.markNeighborgNumbers.active ? 1 : 0,
      },
    }));
  },

  markNeighborgNumbersOnNumberClick: (
    boardId: number,
    numberClicked: number
  ) => {
    const { playerBoards, currentTargets, markedCells, markNeighborgNumbers } = get();

    // Verificación de power-up y objetivo
    if (
      !markNeighborgNumbers.active ||
      !currentTargets.includes(numberClicked)
    )
      return;

    // Encontrar el board correspondiente
    const boardObj = playerBoards.find((b) => b.id === boardId);
    if (!boardObj) return;

    // Buscar los números vecinos en el tablero del jugador
    const neighbors = [
      numberClicked - 2,
      numberClicked - 1,
      numberClicked,
      numberClicked + 1,
      numberClicked + 2,
    ];

    // Buscar posiciones de estos números dentro del tablero del jugador
    // Buscar números vecinos
    const matched = boardObj.board.filter((cell) =>
      neighbors.includes(cell.number)
    );
    if (matched.length === 0) return;

    const existingBoard =
      markedCells.find((sel) => sel.id === boardId)?.board ?? [];
    // Verificar si alguno de los vecinos ya ha sido marcado
    // const hasAlreadyMarked = matched.some(matchedCell =>
    //   existingBoard.some(existing => existing.position === matchedCell.position)
    // );
    // if (hasAlreadyMarked) return;

    // Reemplazar si ya existía el boardId en markedCells
    // const updatedSelected = [...markedCells.filter(sel => sel.id !== boardId), {
    //   id: boardId,
    //   board: [
    //     ...(markedCells.find(sel => sel.id === boardId)?.board ?? []),
    //     ...matched.filter(
    //       (newItem) =>
    //         !markedCells
    //           .find(sel => sel.id === boardId)?.board
    //           ?.some(existing => existing.position === newItem.position)
    //     )
    //   ]
    // }];

    const updatedSelected = [
      ...markedCells.filter((sel) => sel.id !== boardId),
      {
        id: boardId,
        board: [...existingBoard, ...matched],
      },
    ];

    // Agregar al estado de seleccionados
    set(() => ({
      markedCells: updatedSelected,
      markNeighborgNumbers: {
        ...markNeighborgNumbers,
        active: false,
        turnsRemaining: 0,
      },
    }));
  },

  activateViewAllBotBoards: () => {
    set({
      viewAllBotBoards: {
        ...get().viewAllBotBoards,
        active: true,
        turnsRemaining: 5,
        hasActivated: true,
      },
    });
  },

  decrementViewAllBotBoardsTurnsRemaining: () => {
    const { viewAllBotBoards } = get();
    if (viewAllBotBoards.active && viewAllBotBoards.turnsRemaining > 0) {
      set({
        viewAllBotBoards: {
          ...viewAllBotBoards,
          turnsRemaining: viewAllBotBoards.turnsRemaining - 1,
        },
      });
    } else {
      // Desactivar power-up si se acaba
      set({
        viewAllBotBoards: {
          ...viewAllBotBoards,
          active: false,
          turnsRemaining: 0,
        },
      });
    }
  },

  currentSelectPowerUpName: '',
  currentSelectPowerUpDescription: '',
  changeCurrentSelectPowerUp(name: string, description: string) {
    set({
      currentSelectPowerUpName: name,
      currentSelectPowerUpDescription: description,
    });
  },


  // Función para agregar o quitar powerups
  togglePowerUp(id: number) {

    // Si el powerup ya esta seleccionado, se deselecciona, de lo contrario se selecciona
    if (get().selectedPowerUpsIds.includes(id)) {
      get().unSelectPowerUp(id)
      get().playSound(WRONG_SOUND)
    } else {
      // Si el numero de powerups seleccionados es mayor o igual al maximo, no se puede seleccionar otro
      if (get().selectedPowerUpsIds.length >= MAX_POWERUPS) {
        get().playSound(WRONG_SOUND)
        return;
      }
      get().selectPowerUp(id)
      get().playSound(CORRECT_SOUND)
    }
  },

  activateKillBot: () => {
    set({
      killBot: {
        ...get().killBot,
        active: true,
        turnsRemaining: 1,
      },
    });
  },
  killedBotName: '',

  killBotOnBotClick: (botName: string) => {
    const { killBot } = get();
    if (!killBot.active) return;

    // TODO: AQUI DEBE ESTAR EL POWERUP DE ELIMINAR UN BOT
    console.log(`El bot ${botName} ha sido eliminado`);

    // Logica de eliminación de bots
    const bot = get().botBoards.filter((bot) => bot.name !== botName);
    if (!bot) return;

    set(() => ({
      botBoards: bot,
    }));

    // Desactivar power-up
    set({
      killBot: {
        ...killBot,
        active: false,
        hasActivated: true,
        turnsRemaining: 0,
      },
      killedBotName: botName,
    });
  },

  cancelPowerUp(id: number) {
    // set({

    // })
    console.log('Se ha cancelado el powerup ' + id)

    // TODO: AÑADIR MÁS POWERUPS
    if (id === 3) {
      set({
        unmarkNumberBot: {
          ...get().unmarkNumberBot,
          hasActivated: false,
          active: false,
        },
      })
    }


    if (id === 4) {
      set({
        swapNumbersBoard: {
          ...get().swapNumbersBoard,
          hasActivated: false,
          active: false,
        },

        swapNumbersSelected: {
          firstNumber: null,
          secondNumber: null,
        },
      })
    }

    if (id === 5) {
      set({
        forceNumberObjectiveCross: {
          ...get().forceNumberObjectiveCross,
          hasActivated: false,
          active: false,
        },
      })
    }


    if (id === 7) {
      set({
        markNeighborgNumbers: {
          ...get().markNeighborgNumbers,
          hasActivated: false,
          active: false,
        },
      })
    }
    if (id === 9) {
      set({
        randomNumberObjective: {
          ...get().randomNumberObjective,
          hasActivated: false,
          active: false,
        },
      })
    }
    if (id === 10) {
      set({
        killBot: {
          ...get().killBot,
          hasActivated: false,
          active: false,
        },
      })
    }
  },

  resetDefaultPowerups() {
    set({
      selectedForcedNumberObjective: 0,

      slowBots: {
        type: 'continuous',
        hasActivated: false,
        active: false,
        turnsRemaining: 5,
      },

      extraTargets: {
        type: 'continuous',
        hasActivated: false,
        active: false,
        turnsRemaining: 3,
      },

      unmarkNumberBot: {
        type: 'oneTime',
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      swapNumbersBoard: {
        type: 'oneTime',
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      swapNumbersSelected: {
        firstNumber: null,
        secondNumber: null,
      },

      forceNumberObjectiveCross: {
        type: 'oneTime',
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      automaticMarkBoard: {
        type: 'continuous',
        hasActivated: false,
        active: false,
        turnsRemaining: 5,
      },

      markNeighborgNumbers: {
        type: 'oneTime',
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      viewAllBotBoards: {
        type: 'continuous',
        hasActivated: false,
        active: false,
        turnsRemaining: 5,
      },

      randomNumberObjective: {
        type: 'oneTime',
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      killBot: {
        type: 'oneTime',
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      killedBotName: ' '
    })
  },

  // TODO: SE DEBE REINICIAR A LOS VALORES INICIALES DEL POWERUP CADA VEZ QUE CAMBIA DE NIVEL
});