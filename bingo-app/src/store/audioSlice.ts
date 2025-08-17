import { StateCreator } from "zustand";
import * as Tone from 'tone'
import { LevelSliceType } from "./levelSlice";
import { Music } from "../types";
import { preloadedSoundPlayers } from "../utils/Audio/preloadSoundFiles";
import { preloadedMusicPlayers } from "../utils/Audio/preloadMusicFiles";

export type AudioSliceType = {
  isPlayingMusic: boolean,
  isPlayingSound: boolean,
  player: Tone.Player,
  startMusic: (music: Music) => void;
  stopMusic: () => void,
  playSound: (sound: Music) => void;
  changeMusic: (music: Music) => void;
  setIsPlayingMusic: (value: boolean) => void;
  setIsPlayingSound: (value: boolean) => void;
}

export const audioSlice: StateCreator<AudioSliceType & LevelSliceType, [], [], AudioSliceType> = (set, get) => ({
  isPlayingMusic: false,
  isPlayingSound: true,
  player: new Tone.Player(),

  startMusic: (music: Music) => {
    const player = preloadedMusicPlayers.get(music.name);

    if (player && get().isPlayingMusic) {
      player.autostart = true
      player.loop = true
      player.volume.value = music.volume;
      player.start();
      set({
        player: player,
      });
    }
  },

  stopMusic: () => {
    get().player.stop();
  },

  playSound: (sound: Music) => {
    const player = preloadedSoundPlayers.get(sound.name);
    player?.stop()

    if (player && get().isPlayingSound) {
      player.autostart = true
      player.volume.value = sound.volume;
      player.start()
    }
  },

  changeMusic: (music: Music) => {
    get().stopMusic()
    get().startMusic(music)
  },

  setIsPlayingMusic: (value: boolean) => {
    set({ isPlayingMusic: value });
  },

  setIsPlayingSound: (value: boolean) => {
    set({ isPlayingSound: value });
  }

  // TODO: PROBAR SI LOS BOTS SIGUEN EVALUANDO LOS NUMEROS OBJETIVOS, SI NO HAY NINGUN NUMERO OBJETIVO
});