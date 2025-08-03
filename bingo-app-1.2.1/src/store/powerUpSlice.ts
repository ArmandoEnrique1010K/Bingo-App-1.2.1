import { StateCreator } from "zustand";
import { LevelSliceType } from "./levelSlice";
import { PlayerSliceType } from "./playerSlice";
import { GameSliceType } from "./gameSlice";
import { BotSliceType } from "./botSlice";
import { CORRECT_SOUND, WRONG_SOUND } from "../constants/audioSettings";
import { MAX_POWERUPS } from "../constants/defaultConfigs";
import { AudioSliceType } from "./audioSlice";

export type PowerUpSliceType = {
  // Definición de los powerups

  // Ralentizar bots
  slowBots: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Incrementar 2 números objetivos extra
  extraTargets: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Desmarcar un numero de un bot
  unmarkNumberBot: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Intercambiar posiciones de 2 números de un tablero
  swapNumbersBoard: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Forzar un numero objetivo de un patron de cruz
  forceNumberObjectiveCross: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Automarcar un tablero por 5 turnos
  automaticMarkBoard: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Marcar numeros vecinos (los numeros de la forma: X - 2, X - 1, X, X + 1 y X + 2). X es un numero en el tablero
  markNeighborgNumbers: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Ver todos los tableros de los bots por 5 turnos
  viewAllBotBoards: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Numero aleatorio objetivo
  randomNumberObjective: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

  // Eliminar un bot del nivel permanentemente
  killBot: {
    hasActivated: boolean;
    active: boolean;
    turnsRemaining: number;
  };

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
  activateSwapNumbersBoard: () => void;
  swapNumberBoardOnNumbersClicks: (
    boardId: number,
    firstNumberClicked: number,
    secondNumberClicked: number,
  ) => void;

  // Forzar un numero objetivo de un patron de cruz
  // toggleForceNumberObjectiveCross: () => void;
  // activateForceNumberObjectiveCrossOnNumberClick: (
  //   boardId: number,
  //   numberClicked: number
  // ) => void;

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
  // toggleViewAllBotBoards: () => void;
  // activateViewAllBotBoardsOnNumberClick: (
  //   boardId: number,
  //   numberClicked: number
  // ) => void;

  // // Numero aleatorio objetivo
  // toggleRandomNumberObjective: () => void;
  // activateRandomNumberObjectiveOnNumberClick: (
  //   boardId: number,
  //   numberClicked: number
  // ) => void;

  // // Eliminar un bot del nivel permanentemente
  // toggleKillBot: () => void;
  // activateKillBotOnNumberClick: (
  //   botName: string,
  //   idBoard: string,
  //   numberClicked: number
  // ) => void;

  // Reiniciar los valores predeterminados de los powerups
  currentSelectPowerUpName: string;
  currentSelectPowerUpDescription: string;
  changeCurrentSelectPowerUp: (name: string, description: string) => void;
  togglePowerUp: (id: number) => void;
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
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  extraTargets: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  unmarkNumberBot: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  swapNumbersBoard: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  forceNumberObjectiveCross: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  automaticMarkBoard: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  markNeighborgNumbers: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  viewAllBotBoards: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  randomNumberObjective: {
    hasActivated: false,
    active: false,
    turnsRemaining: 0,
  },

  killBot: {
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
        hasActivated: true,
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
        hasActivated: true,
        active: true,
        turnsRemaining: 1,
      },
    }));
  },

  swapNumberBoardOnNumbersClicks: (boardId: number, firstNumberClicked: number, secondNumberClicked: number) => {
    console.log(boardId, firstNumberClicked, secondNumberClicked)
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




  resetDefaultPowerups() {
    set({

      slowBots: {
        hasActivated: false,
        active: false,
        turnsRemaining: 5,
      },

      extraTargets: {
        hasActivated: false,
        active: false,
        turnsRemaining: 3,
      },

      unmarkNumberBot: {
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      swapNumbersBoard: {
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      forceNumberObjectiveCross: {
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      automaticMarkBoard: {
        hasActivated: false,
        active: false,
        turnsRemaining: 5,
      },

      markNeighborgNumbers: {
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      viewAllBotBoards: {
        hasActivated: false,
        active: false,
        turnsRemaining: 5,
      },

      randomNumberObjective: {
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },

      killBot: {
        hasActivated: false,
        active: false,
        turnsRemaining: 1,
      },
    })
  },

  // TODO: SE DEBE REINICIAR A LOS VALORES INICIALES DEL POWERUP CADA VEZ QUE CAMBIA DE NIVEL
});