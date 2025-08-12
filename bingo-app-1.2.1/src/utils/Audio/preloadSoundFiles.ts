import * as Tone from "tone";
import { ROLL_SOUND, CLICK_SOUND, CORRECT_SOUND, WRONG_SOUND, VICTORY_SOUND, DEFEAT_SOUND, CORRECT_BOT_SOUND, POWERUP_SOUND } from "../../constants/audioSettings";

export const preloadedSoundPlayers = new Map<string, Tone.Player>();

export const preloadSoundFiles = async () => {
  try {
    const sounds = [WRONG_SOUND, CORRECT_SOUND, ROLL_SOUND, CLICK_SOUND, VICTORY_SOUND, DEFEAT_SOUND, CORRECT_BOT_SOUND, POWERUP_SOUND]

    for (const sound of sounds) {
      const player = new Tone.Player(
      ).toDestination();
      await player.load(`/audio/sound/${sound.name}.mp3`);
      preloadedSoundPlayers.set(sound.name, player);
    }
  } catch (error) {
    console.error(`Error al precargar sonido: ${error}, intente pulsar el botón de activar/desactivar sonido`);
  }
}
