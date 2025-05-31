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
  unlockedLevels: number[];
  levelData: Level,
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
};

const initialLevelData = {
  level: 0,
  targetText: "",
  boards: 0,
  patterns: [],
  bots: [],
  color: 'blue',
  music: SOMEDAY,
}

export const gameSlice: StateCreator<GameSliceType & PlayerSliceType & LevelSliceType & AudioSliceType & BotSliceType & PowerUpSliceType, [], [], GameSliceType> = (set, get) => ({
  isLoadingStartScreen: true,
  isStartScreenButtonVisible: true,
  showCreditsModal: false,
  showHelpModal: false,
  unlockedLevels: [],
  levelData: initialLevelData,

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
      if (!state.unlockedLevels.includes(level)) {
        const updatedLevels = [...state.unlockedLevels, level];
        localStorage.setItem("unlockedLevels", JSON.stringify(updatedLevels));

        return { unlockedLevels: updatedLevels };
      }
      return state;

    },

    )
  },
  getUnlockedLevelsFromStorage: () => {
    const storedLevels = localStorage.getItem('unlockedLevels');

    if (!storedLevels) {
      localStorage.setItem('unlockedLevels', JSON.stringify([1]));
      set({ unlockedLevels: [1] });
      return;
    }

    set({ unlockedLevels: JSON.parse(storedLevels) });
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
});