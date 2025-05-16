import { StateCreator } from "zustand";
import * as Tone from 'tone'
import { LevelSliceType } from "./levelSlice";
import { Music } from "../types";
import { preloadedSoundPlayers } from "../utils/Audio/preloadSoundFiles";
import { preloadedMusicPlayers } from "../utils/Audio/preloadMusicFiles";

export type MusicSliceType = {
  isPlayingMusic: boolean,
  player: Tone.Player,
  startMusic: (music: Music) => void;
  stopMusic: () => void,
  playSound: (sound: Music) => void;


  // updatePlayer: (data: Tone.Player) => void,
}

export const musicSlice: StateCreator<MusicSliceType & LevelSliceType, [], [], MusicSliceType> = (set, get) => ({
  isPlayingMusic: false,
  player: new Tone.Player(),

  startMusic: (music: Music) => {
    const player = preloadedMusicPlayers.get(music.name);

    if (player) {
      player.autostart = false
      player.loop = true
      player.volume.value = music.volume;
      player.start();
      set({ player, isPlayingMusic: true });
      console.log(`Reproduciendo: ${music.name}`);
    } else {
      console.log(`Error: Pista "${music.name}" no encontrada. ¿Fue precargada?`);
      // Fallback: Cargar bajo demanda aquí si es necesario
    }
  },


  stopMusic: () => {
    get().player.stop();
    set({ isPlayingMusic: false });
  },

  // TODO: INTENTAR AÑADIR UN ESTADO BOOLEANO SIMILAR A MUSIC
  playSound: (sound: Music) => {
    const player = preloadedSoundPlayers.get(sound.name);

    if (player) {
      // player.autostart = true; // Reproduce automáticamente
      player.autostart = false
      player.volume.value = sound.volume;
      player.start()
      console.log(`Reproduciendo sonido: ${sound.name}`);
    } else {
      console.log(`Error: Sonido "${sound.name}" no encontrado. ¿Fue precargado?`);
    }
  }
  // updatePlayer: (data) => {
  //   set({ player: data })
  // }

});