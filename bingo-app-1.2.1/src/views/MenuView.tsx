import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { CLICK_SOUND } from "../constants/audioSettings";
import { APP_VERSION } from "../constants/defaultConfigs";

export default function MenuView() {
  const unlockedLevels = useAppStore((state) => state.unlockedLevels);
  const levelData = useAppStore((state) => state.levelData);
  const startMusic = useAppStore((state) => state.startMusic);
  const getColorLevel = useAppStore((state) => state.getColorLevel);
  const startScreenLoading = useAppStore((state) => state.startScreenLoading);
  const startScreenButton = useAppStore((state) => state.startScreenButton);
  const changeStateScreenButton = useAppStore(
    (state) => state.changeStateScreenButton
  );
  const stopMusic = useAppStore((state) => state.stopMusic);
  const isPlayingMusic = useAppStore((state) => state.isPlayingMusic);
  const playSound = useAppStore((state) => state.playSound);
  const changeMusic = useAppStore((state) => state.changeMusic);
  const upgradeIsPlayingMusic = useAppStore(
    (state) => state.upgradeIsPlayingMusic
  );

  useEffect(() => {
    // stopMusic();

    // if (isPlayingMusic) {
    //   startMusic(levelData.music);
    // } else {
    //   stopMusic();
    // }

    changeMusic(levelData.music);
    console.log(levelData);
  }, [levelData]);

  return (
    <div className="min-h-full max-h-full flex flex-col items-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center my-8">
        BingoApp <span className="text-xl">v{APP_VERSION}</span>
      </h1>
      {startScreenLoading === true ? (
        <Loader />
      ) : startScreenButton === true ? (
        <button
          className={`w-full flex-grow flex items-center justify-center bg-${levelData.color}-500 text-white text-2xl font-semibold p-4 cursor-pointer `}
          onClick={() => {
            changeStateScreenButton();
            playSound(CLICK_SOUND);
            upgradeIsPlayingMusic(true);
            changeMusic(levelData.music);
            // startMusic(levelData.music);
          }}
        >
          Iniciar juego
        </button>
      ) : (
        <>
          <div className="w-full max-w-4xl px-4 mb-4">
            <p className="text-lg text-center mb-6">
              Seleccione un nivel para empezar
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {unlockedLevels.map((level: number) => (
                <Link
                  key={level}
                  to={`/level_${level}`}
                  onClick={() => playSound(CLICK_SOUND)}
                  className={`bg-${getColorLevel(
                    level
                  )}-500 text-white text-center py-4 rounded-md shadow-md shadow-black hover:bg-gray-900 `}
                >
                  Nivel {level}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
