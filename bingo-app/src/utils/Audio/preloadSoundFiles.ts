import * as Tone from "tone";
import { ROLL_SOUND, CLICK_SOUND, CORRECT_SOUND, WRONG_SOUND, VICTORY_SOUND, DEFEAT_SOUND, CORRECT_BOT_SOUND, POWERUP_SOUND } from "../../constants/audioSettings";

export const preloadedSoundPlayersMap = new Map<string, Tone.Player>();

// Función para precargar los sonidos
export const preloadSoundFiles = async () => {
  try {
    // Lista de sonidos a precargar
    const sounds = [CLICK_SOUND, POWERUP_SOUND, WRONG_SOUND, ROLL_SOUND, CORRECT_BOT_SOUND, CORRECT_SOUND, VICTORY_SOUND, DEFEAT_SOUND]

    // Bucle para precargar los sonidos 
    for (const sound of sounds) {
      const player = new Tone.Player(
      ).toDestination();

      // Espera a que el sonido se cargue en memoria y se almacena en el mapa
      await player.load(`/audio/sound/${sound.name}.mp3`);
      preloadedSoundPlayersMap.set(sound.name, player);
    }
  } catch (error) {
    console.error(`Error al precargar sonido: ${error}, intente pulsar el botón de activar/desactivar sonido`);
  }
}
