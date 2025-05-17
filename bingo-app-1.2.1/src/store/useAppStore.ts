import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { levelSlice, LevelSliceType } from "./levelSlice";
import { playerSlice, PlayerSliceType } from "./playerSlice";
import { musicSlice, MusicSliceType } from "./musicSlice";
import { gameSlice, GameSliceType } from "./gameSlice";
import { botSlice, BotSliceType } from "./botSlice";

export const useAppStore = create<LevelSliceType & PlayerSliceType & MusicSliceType & GameSliceType & BotSliceType>()(devtools((...a) => ({
  ...levelSlice(...a),
  ...playerSlice(...a),
  ...musicSlice(...a),
  ...gameSlice(...a),
  ...botSlice(...a),
})))