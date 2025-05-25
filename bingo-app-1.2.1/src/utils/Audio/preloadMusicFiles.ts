import * as Tone from "tone";
import { ANYMORE, DARKNESS, FRIENDS, ANYMORE_ENDING, LIVE, MOONLIGHT, MOUNTAIN, SLOW, SOMEDAY, TAP, DARKNESS_SOLO } from "../../constants/audioSettings";

export const preloadedMusicPlayers = new Map<string, Tone.Player>();

export const preloadMusicFiles = async () => {
  try {
    const tracks = [
      SOMEDAY, TAP, MOONLIGHT, DARKNESS, FRIENDS, LIVE, MOUNTAIN, SLOW, ANYMORE_ENDING, DARKNESS_SOLO, ANYMORE
    ];

    for (const track of tracks) {
      const player = new Tone.Player(
      ).toDestination();
      await player.load(`/audio/music/${track.name}.mp3`);
      preloadedMusicPlayers.set(track.name, player);
      console.log(`Precargado: ${track.name}`);
    }
  } catch (error) {
    console.error("Error al precargar música:", error);
  }
};
