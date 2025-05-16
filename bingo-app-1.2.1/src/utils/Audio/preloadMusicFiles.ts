import * as Tone from "tone";
import { DARKNESS, FRIENDS, LIVE, MOONLIGHT, MOUNTAIN, SLOW, SOMEDAY, TAP } from "../../constants/audioSettings";

export const preloadedMusicPlayers = new Map<string, Tone.Player>();

export const preloadMusicFiles = async () => {
  try {
    const tracks = [
      SOMEDAY, TAP, MOONLIGHT, DARKNESS, FRIENDS, LIVE, MOUNTAIN, SLOW
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
