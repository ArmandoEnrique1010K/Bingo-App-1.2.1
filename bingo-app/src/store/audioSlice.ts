import { StateCreator } from "zustand";
import * as Tone from 'tone'
import { LevelSliceType } from "./levelSlice";
import { Audio } from "../types";
import { preloadedMusicPlayersMap } from "../utils/Audio/preloadMusicFiles";
import { preloadedSoundPlayersMap } from "../utils/Audio/preloadSoundFiles";

export type AudioSliceType = {
  isPlayingMusic: boolean,
  isPlayingSound: boolean,
  player: Tone.Player,
  startMusic: (music: Audio) => void;
  stopMusic: () => void,
  playSound: (sound: Audio) => void;
  changeMusic: (music: Audio) => void;
  setIsPlayingMusic: (value: boolean) => void;
  setIsPlayingSound: (value: boolean) => void;
}

// Definición del slice de audio
export const audioSlice: StateCreator<AudioSliceType & LevelSliceType, [], [], AudioSliceType> = (set, get) => ({
  // Valores iniciales de los reproductores de audio de canción y sonido
  isPlayingMusic: false,
  isPlayingSound: true,

  // Instancia del reproductor de sonido de Tone.js
  player: new Tone.Player(),

  // Definicion de las acciones del slice

  // Acción para reproducir una canción
  // Parametro: un objeto de tipo Audio (que contiene el nombre de la canción y su volumen)
  startMusic: (music: Audio) => {
    // Obtiene el reproductor de la canción de la lista de reproductores precargados
    const player = preloadedMusicPlayersMap.get(music.name);

    // Si hay un reproductor de la canción y el audio de la canción esta activado
    if (player && get().isPlayingMusic) {
      // Auto-reproducir
      player.autostart = true
      // Bucle
      player.loop = true
      // Volumen
      player.volume.value = music.volume;
      // El metodo start sirve para reproducir la canción
      player.start();

      // Actualiza el reproductor
      set({
        player: player,
      });
    }
  },

  // Detiene la canción
  stopMusic: () => {
    // El metodo stop sirve para detener la canción
    get().player.stop();
  },

  // Reproduce un sonido (similar a startMusic, pero sin bucle)
  playSound: (sound: Audio) => {
    const player = preloadedSoundPlayersMap.get(sound.name);
    player?.stop()

    if (player && get().isPlayingSound) {
      player.autostart = true
      player.volume.value = sound.volume;
      player.start()
    }
  },

  // Cambia el reproductor de la canción, detiene la canción actual y reproduce la nueva
  changeMusic: (music: Audio) => {
    get().stopMusic()
    get().startMusic(music)
  },

  // Cambia el valor de isPlayingMusic
  setIsPlayingMusic: (value: boolean) => {
    set({ isPlayingMusic: value });
  },

  // Cambia el valor de isPlayingSound
  setIsPlayingSound: (value: boolean) => {
    set({ isPlayingSound: value });
  }
});