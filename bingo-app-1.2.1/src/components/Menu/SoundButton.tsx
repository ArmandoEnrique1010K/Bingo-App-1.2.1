import { SpeakerWaveIcon as SpeakerWaveIconSolid } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon as SpeakerWaveIconOutline } from "@heroicons/react/24/outline";
import { useAppStore } from "../../store/useAppStore";

export default function SoundButton() {
  const isPlayingSound = useAppStore((state) => state.isPlayingSound);
  const levelData = useAppStore((state) => state.levelData);
  const upgradeIsPlayingSound = useAppStore(
    (state) => state.upgradeIsPlayingSound
  );

  const { color } = levelData;

  const handlePlaySound = () => {
    if (isPlayingSound) {
      upgradeIsPlayingSound(false);
    } else {
      upgradeIsPlayingSound(true);
    }
  };
  return (
    <>
      <button
        className={`sm:py-4 py-2 px-3 cursor-pointer ${`text-${color}-500`}`}
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
