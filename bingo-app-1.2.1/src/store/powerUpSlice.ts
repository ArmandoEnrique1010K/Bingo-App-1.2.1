import { StateCreator } from "zustand"
import { LevelSliceType } from "./levelSlice"

export type PowerUpSliceType = {
  powerups: {
    // Incrementar 2 números objetivos extra
    extraTargets: {
      active: boolean,
      turnsRemaining: number
    }
  },

  activateExtraTargets: () => void,
  decrementExtraTargetsTurn: () => void
}

export const powerUpSlice: StateCreator<PowerUpSliceType & LevelSliceType, [], [], PowerUpSliceType> = (set, get) => ({
  powerups: {
    extraTargets: {
      active: false,
      turnsRemaining: 0,
    },
  },

  activateExtraTargets: () => {
    set((state) => ({
      powerups: {
        ...state.powerups,
        extraTargets: {
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
            active: false,
            turnsRemaining: 0,
          },
        },
      }));
    }
  },

})