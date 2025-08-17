import { StateCreator } from "zustand";
import { PlayerSliceType } from "./playerSlice";
import { LevelSliceType } from "./levelSlice";
import { AudioSliceType } from "./audioSlice";
import { CLICK_SOUND, SOMEDAY } from "../constants/audioSettings";
import { BotSliceType } from "./botSlice";
import { PowerUpSliceType } from "./powerUpSlice";
import { levels } from "../data/levels";
import { Level } from "../types";

export type GameSliceType = {
  isLoadingStartScreen: boolean
  isStartScreenButtonVisible: boolean
  showCreditsModal: boolean,
  showHelpModal: boolean,
  unlockedLevelsList: number[];
  levelData: Level,
  unlockedPowerUpsIds: number[];
  toogleStartScreenLoading: () => void
  toogleStartScreenButton: () => void;
  openCreditsModal: () => void,
  closeCreditsModal: () => void,
  openHelpModal: () => void,
  closeHelpModal: () => void,
  unlockLevel: (level: number) => void;
  getUnlockedLevelsFromStorage: () => void
  getLevelNumberFromUrl: (pathname: string) => void
  getColorLevel: (level: number) => string;
  unlockPowerUp: (id: number) => void;
  getUnlockedPowerUpsFromStorage: () => void;
};

const initialLevelData = {
  level: 0,
  color: 'blue',
  music: SOMEDAY,
  boards: 0,
  targetText: "",
  patterns: [],
  bots: [],
  tip: "",
}

export const gameSlice: StateCreator<GameSliceType & PlayerSliceType & LevelSliceType & AudioSliceType & BotSliceType & PowerUpSliceType, [], [], GameSliceType> = (set, get) => ({
  isLoadingStartScreen: true,
  isStartScreenButtonVisible: true,
  showCreditsModal: false,
  showHelpModal: false,
  unlockedLevelsList: [],
  levelData: initialLevelData,
  unlockedPowerUpsIds: [],

  toogleStartScreenLoading: () => {
    set({ isLoadingStartScreen: false })
  },

  toogleStartScreenButton: () => {
    set({ isStartScreenButtonVisible: false })
  },

  openCreditsModal: () => {
    set({
      showCreditsModal: true
    })
    get().playSound(CLICK_SOUND)
  },
  closeCreditsModal: () => {
    set({
      showCreditsModal: false
    })
    get().playSound(CLICK_SOUND)
  },

  openHelpModal: () => {
    set({
      showHelpModal: true
    })
    get().playSound(CLICK_SOUND)
  },

  closeHelpModal: () => {
    set({
      showHelpModal: false
    })
    get().playSound(CLICK_SOUND)
  },

  unlockLevel: (level: number) => {
    set((state) => {
      if (!state.unlockedLevelsList.includes(level)) {
        const updatedLevels = [...state.unlockedLevelsList, level];
        localStorage.setItem("unlockedLevels", JSON.stringify(updatedLevels));

        return { unlockedLevelsList: updatedLevels };
      }
      return state;

    },

    )
  },
  getUnlockedLevelsFromStorage: () => {
    const storedLevels = localStorage.getItem('unlockedLevels');

    if (!storedLevels) {
      localStorage.setItem('unlockedLevels', JSON.stringify([1]));
      set({ unlockedLevelsList: [1] });
      return;
    }

    set({ unlockedLevelsList: JSON.parse(storedLevels) });
  },


  getLevelNumberFromUrl: (pathname) => {
    const match = pathname.match(/\/level_(\d+)/);
    const level = match ? parseInt(match[1], 10) : 0;
    const numberLevel = levels.find(l => l.level === level) || initialLevelData;

    set({
      levelData: numberLevel,
    })
  },

  getColorLevel: (level) => {
    return levels.find(l => l.level === level)?.color ?? 'blue'
  },

  unlockPowerUp: (id: number) => {
    // Los powerups se desbloquean al completar un nivel 
    // Si el jugador ha completado el nivel 2, se desbloquea el powerup con el id 1
    // Si el jugador ha completado el nivel 5, se desbloquea el powerup con el id 2
    // Si el jugador ha completado el nivel 8, se desbloquea el powerup con el id 3
    // Si el jugador ha completado el nivel 11, se desbloquea el powerup con el id 4
    // Si el jugador ha completado el nivel 14, se desbloquea el powerup con el id 5
    // Etc...
    set((state) => {
      if (!state.unlockedPowerUpsIds.includes(id)) {
        const updatedPowerUps = [...state.unlockedPowerUpsIds, id];
        localStorage.setItem("unlockedPowerUpsIds", JSON.stringify(updatedPowerUps));

        return { unlockedPowerUpsIds: updatedPowerUps };
      }
      return state;
    })
  },

  getUnlockedPowerUpsFromStorage: () => {
    const storedPowerUps = localStorage.getItem('unlockedPowerUpsIds');

    if (!storedPowerUps) {
      localStorage.setItem('unlockedPowerUpsIds', JSON.stringify([]));
      set({ unlockedPowerUpsIds: [] });
      return;
    }

    set({ unlockedPowerUpsIds: JSON.parse(storedPowerUps) });
  },
});