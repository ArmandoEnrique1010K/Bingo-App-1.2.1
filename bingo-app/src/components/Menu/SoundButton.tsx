import { SpeakerWaveIcon as SpeakerWaveIconSolid } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon as SpeakerWaveIconOutline } from "@heroicons/react/24/outline";
import { useAppStore } from "../../store/useAppStore";

export default function SoundButton() {
  const isPlayingSound = useAppStore((state) => state.isPlayingSound);
  const levelData = useAppStore((state) => state.levelData);
  const setIsPlayingSound = useAppStore((state) => state.setIsPlayingSound);

  const { color } = levelData;

  const handlePlaySound = () => {
    setIsPlayingSound(!isPlayingSound);
  };

  return (
    <>
      <button
        className={`sm:py-4 py-2 px-2 cursor-pointer ${`text-${color}-500`}`}
        onClick={handlePlaySound}
      >
        {isPlayingSound ? (
          <SpeakerWaveIconSolid className={`sm:w-7 w-5`} />
        ) : (
          <SpeakerWaveIconOutline className={`sm:w-7 w-5`} />
        )}
      </button>
    </>
  );
}
