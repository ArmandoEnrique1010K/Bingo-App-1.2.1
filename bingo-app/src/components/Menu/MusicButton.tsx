import { MusicalNoteIcon as MusicalNoteIconSolid } from "@heroicons/react/24/solid";
import { MusicalNoteIcon as MusicalNoteIconOutline } from "@heroicons/react/24/outline";
import { useAppStore } from "../../store/useAppStore";

export default function MusicButton() {
  const isPlayingMusic = useAppStore((state) => state.isPlayingMusic);
  const stopMusic = useAppStore((state) => state.stopMusic);
  const startMusic = useAppStore((state) => state.startMusic);
  const levelData = useAppStore((state) => state.levelData);
  const setIsPlayingMusic = useAppStore((state) => state.setIsPlayingMusic);

  const { color, music } = levelData;

  const handlePlayMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
    if (isPlayingMusic) {
      stopMusic();
    } else {
      startMusic(music);
    }
  };

  return (
    <>
      <button
        className={`sm:py-4 py-2 px-2 cursor-pointer ${`text-${color}-500`}`}
        onClick={handlePlayMusic}
      >
        {isPlayingMusic ? (
          <MusicalNoteIconSolid className={`sm:w-7 w-5`} />
        ) : (
          <MusicalNoteIconOutline className={`sm:w-7 w-5`} />
        )}
      </button>
    </>
  );
}
