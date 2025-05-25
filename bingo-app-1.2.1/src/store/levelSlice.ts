import { StateCreator } from "zustand";
import { levels } from "../data/levels";
import { Level } from "../types";
import { AudioSliceType } from "./audioSlice";
import { SOMEDAY, TAP } from "../constants/audioSettings";

export type LevelSliceType = {
  startScreenLoading: boolean
  changeStateStartScreenLoading: () => void
  startScreenButton: boolean
  changeStateScreenButton: () => void;
  unlockedLevels: number[];
  levelData: Level,
  unlockLevel: (level: number) => void;
  getUnlockedLevelsFromStorage: () => void
  getLevelNumberFromUrl: (pathname: string) => void
  getColorLevel: (level: number) => string;

};



export const levelSlice: StateCreator<LevelSliceType & AudioSliceType, [], [], LevelSliceType> = (set, get) => ({
  startScreenLoading: true,
  changeStateStartScreenLoading: () => {
    set({ startScreenLoading: false })
  },
  startScreenButton: true,
  changeStateScreenButton: () => {
    set({ startScreenButton: false })
  },

  unlockedLevels: [],
  levelData: {
    level: 0,
    targetText: "",
    boards: 0,
    patterns: [],
    bots: [],
    color: 'blue',
    music: TAP,
  },
  unlockLevel: (level: number) => {
    set((state) => {
      console.log('NIVEL DESBLOQUEADO: ' + level)
      if (!state.unlockedLevels.includes(level)) {
        return { unlockedLevels: [...state.unlockedLevels, level] };
      }
      return state;
    });

    localStorage.setItem('unlockedLevels', JSON.stringify(get().unlockedLevels));
  },


  getUnlockedLevelsFromStorage: () => {
    const storedLevels = localStorage.getItem('unlockedLevels');
    if (storedLevels) {
      set({
        unlockedLevels: JSON.parse(storedLevels)
      });
    }
  },


  // Obtiene el nivel desde la URL
  getLevelNumberFromUrl: (pathname) => {
    const match = pathname.match(/\/level_(\d+)/);

    if (match) {

      const level = match ? parseInt(match[1], 10) : 0;
      console.log('HAY UN NIVEL EN LA URL, Y ES: ', level)

      const numberLevel = levels.find(l => l.level === level);
      set({ levelData: numberLevel })

      // REPRODUCIR MUSICA DEL NUEVO NIVEL
      // get().startMusic()


    } else {
      set({
        levelData: {
          level: 0,
          targetText: "",
          boards: 0,
          patterns: [],
          bots: [],
          color: 'blue',
          music: SOMEDAY,
        },
      })
      console.log('NO HAY UN NIVEL EN LA URL')
    }
  },

  getColorLevel: (level) => {
    return levels.find(l => l.level === level)?.color || 'blue'
  },

});