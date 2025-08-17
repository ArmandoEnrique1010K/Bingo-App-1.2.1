import * as Tone from "tone";
import { ANYMORE, DARKNESS, FRIENDS, ANYMORE_ENDING, LIVE, MOONLIGHT, MOUNTAIN, SLOW, SOMEDAY, TAP, DARKNESS_SOLO, SELFLESS } from "../../constants/audioSettings";

export const preloadedMusicPlayersMap = new Map<string, Tone.Player>();

// Función para precargar las canciones
export const preloadMusicFiles = async () => {
  try {
    // Lista de canciones a precargar
    const tracks = [
      SOMEDAY, SLOW, TAP, MOONLIGHT, SELFLESS, FRIENDS, LIVE, MOUNTAIN, DARKNESS, ANYMORE, ANYMORE_ENDING, DARKNESS_SOLO,
    ];

    // Bucle para precargar las canciones
    for (const track of tracks) {
      const player = new Tone.Player(
      ).toDestination();

      // Espera a que la canción se cargue en memoria y se almacena en el mapa
      await player.load(`/audio/music/${track.name}.mp3`);
      preloadedMusicPlayersMap.set(track.name, player);
    }
  } catch (error) {
    console.error(`Error al precargar música: ${error}, intente pulsar el botón de activar/desactivar musica`);
  }
};
