import { StateCreator } from "zustand"
import { LevelSliceType } from "./levelSlice"
import { PlayerSliceType } from "./playerSlice"
import { GameSliceType } from "./gameSlice"

export type PowerUpSliceType = {
  powerups: {
    // Incrementar 2 números objetivos extra
    extraTargets: {
      hasActivated: boolean,
      active: boolean,
      turnsRemaining: number
    },

    // Marcar numeros vecinos (los numeros de la forma: X - 2, X - 1, X, X + 1 y X + 2). X es un numero en el tablero
    markNeighborgNumbers: {
      hasActivated: boolean,
      active: boolean,
      turnsRemaining: number
    }

    // Ralentizar bots

    // Desmarcar un numero de un bot

    // Intercambiar posiciones y numeros de una columna de numeros

    // Forzar un numero objetivo de un patron de cruz

    // Automarcar un tablero por 5 turnos

    // Numero aleatorio objetivo
  },

  activateExtraTargets: () => void,
  decrementExtraTargetsTurn: () => void

  // Al hacer clic en el powerup markNeighborgNumbers, el jugador debe hacer clic en algun numero del tablero que coincida con un numero objetivo para activarlo
  // Si vuelve a hacer clic en el powerup se desactiva

  // Al hacer clic en el numero, se debe buscar en el tablero del jugador (no en todos los tableros), los numeros que tengan la forma especificada y luego añadirlos en el state de selectedNumbersAndPositions
  toggleMarkNeighborgNumbers: () => void
  activateMarkNeighborgOnNumberClick: (boardId: number, numberClicked: number) => void;

}

export const powerUpSlice: StateCreator<PowerUpSliceType & LevelSliceType & PlayerSliceType & GameSliceType, [], [], PowerUpSliceType> = (set, get) => ({
  powerups: {
    extraTargets: {
      hasActivated: false,
      active: false,
      turnsRemaining: 0,
    },
    markNeighborgNumbers: {
      hasActivated: false,
      active: false,
      turnsRemaining: 0,
    },
  },

  activateExtraTargets: () => {
    set((state) => ({
      powerups: {
        ...state.powerups,
        extraTargets: {
          hasActivated: true,
          active: true,
          turnsRemaining: 3,
        },
      },
    }));
  },
  decrementExtraTargetsTurn: () => {
    const { powerups } = get();
    if (powerups.extraTargets.active && powerups.extraTargets.turnsRemaining > 0) {
      set((state) => ({
        powerups: {
          ...state.powerups,
          extraTargets: {
            ...state.powerups.extraTargets,
            turnsRemaining: state.powerups.extraTargets.turnsRemaining - 1,
          },
        },
      }));
    } else {
      // Desactivar power-up si se acaba
      set((state) => ({
        powerups: {
          ...state.powerups,
          extraTargets: {
            // hasActivated: true,
            ...state.powerups.extraTargets,
            active: false,
            turnsRemaining: 0,
          },
        },
      }));
    }
  },
  toggleMarkNeighborgNumbers: () => {
    set((state) => ({
      powerups: {
        ...state.powerups,
        markNeighborgNumbers: {
          ...state.powerups.markNeighborgNumbers,
          // Esta propiedad indica que el powerup ya ha sido activado, por lo que ya no se podra volver a activar
          hasActivated: true, // TODO: YA NO SE PODRA CANCELAR EL POWERUP  UNA VEZ PULSADO EL BOTÓN
          active: !state.powerups.markNeighborgNumbers.active,
          turnsRemaining: !state.powerups.markNeighborgNumbers.active ? 1 : 0,
        },
      },
    }));
  },

  // TODO: SI EL JUGADOR HA MARCADO UN NUMERO QUE NO ES UN NUMERO OBJETIVO O SI EL NUMERO YA ESTA MARCADO, NO SE DEBERIA APLICAR EL POWERUP
  // TODO: TAMBIEN SI UN NUMERO VECINO YA ESTA MARCADO, TAMPOCO LO DEBERIA AGREGAR
  activateMarkNeighborgOnNumberClick: (boardId: number, numberClicked: number) => {
    const { playerBoards, currentTargets, selectedNumbersAndPositions, powerups } = get();

    // Verificación de power-up y objetivo
    if (!powerups.markNeighborgNumbers.active || !currentTargets.includes(numberClicked)) return;

    // Encontrar el board correspondiente
    const boardObj = playerBoards.find((b) => b.id === boardId);
    if (!boardObj) return;

    // Buscar los números vecinos en el tablero del jugador
    const neighbors = [numberClicked - 2, numberClicked - 1, numberClicked, numberClicked + 1, numberClicked + 2];

    // Buscar posiciones de estos números dentro del tablero del jugador
    // Buscar números vecinos
    const matched = boardObj.board.filter(cell => neighbors.includes(cell.number));
    if (matched.length === 0) return;


    // Reemplazar si ya existía el boardId en selectedNumbersAndPositions
    const updatedSelected = [...selectedNumbersAndPositions.filter(sel => sel.id !== boardId), {
      id: boardId,
      board: [
        ...(selectedNumbersAndPositions.find(sel => sel.id === boardId)?.board ?? []),
        ...matched.filter(
          (newItem) =>
            !selectedNumbersAndPositions
              .find(sel => sel.id === boardId)?.board
              ?.some(existing => existing.position === newItem.position)
        )
      ]
    }];



    // Agregar al estado de seleccionados
    set(() => ({
      selectedNumbersAndPositions: updatedSelected,
      powerups: {
        ...powerups,
        markNeighborgNumbers: {
          ...powerups.markNeighborgNumbers,
          active: false,
          turnsRemaining: 0,
        },
      },
    }));
  },


})