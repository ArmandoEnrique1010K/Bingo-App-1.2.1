import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { levelSlice, LevelSliceType } from "./levelSlice";
import { playerSlice, PlayerSliceType } from "./playerSlice";
import { audioSlice, AudioSliceType } from "./audioSlice";
import { gameSlice, GameSliceType } from "./gameSlice";
import { botSlice, BotSliceType } from "./botSlice";
import { powerUpSlice, PowerUpSliceType } from "./powerUpSlice";

// Creación del store global de la aplicación, que combina todos los slices
export const useAppStore = create<LevelSliceType & PlayerSliceType & AudioSliceType & GameSliceType & BotSliceType & PowerUpSliceType>()(devtools((...a) => ({
  ...levelSlice(...a),
  ...playerSlice(...a),
  ...audioSlice(...a),
  ...gameSlice(...a),
  ...botSlice(...a),
  ...powerUpSlice(...a)
})))