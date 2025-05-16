import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";
import { useLocation } from "react-router";
import StatusGameModal from "../components/Status/StatusGameModal";
import TargetNumbers from "../components/Targets/TargetNumbers";
import MarkedPositionsBoard from "../components/Pattern/ObjectivePattern";
import PlayerBoard from "../components/Player/PlayerBingoBoard";
import { START_LEVEL_MODAL } from "../constants/statusModalsText";
import { MAX_TURNS } from "../constants/defaultConfigs";

export default function LevelView() {
  const levelData = useAppStore((state) => state.levelData);
  const startMusic = useAppStore((state) => state.startMusic);
  const stopMusic = useAppStore((state) => state.stopMusic);
  const isPlayingMusic = useAppStore((state) => state.isPlayingMusic);
  const changeStatusModal = useAppStore((state) => state.changeStatusModal);
  const resetLevel = useAppStore((state) => state.resetLevel);
  const currentRound = useAppStore((state) => state.currentRound);

  const getLevelNumberFromUrl = useAppStore(
    (state) => state.getLevelNumberFromUrl
  );

  const location = useLocation();

  useEffect(() => {
    getLevelNumberFromUrl(location.pathname);
    changeStatusModal(START_LEVEL_MODAL);
  }, [location.pathname]);

  // TODO: ¿PORQUE LANZA EL MISMO EFECTO 2 VECES?
  useEffect(() => {
    stopMusic();
    if (isPlayingMusic) {
      startMusic(levelData.music);
    } else {
      stopMusic();
    }

    resetLevel();
    console.log("HA CAMBIADO DE NIVEL");
  }, [levelData]);

  return (
    <>
      <div className="text-white m-auto">
        <div className="container py-4 flex sm:flex-row flex-col items-start sm:gap-3 md:gap-6 gap-3 justify-center mx-auto">
          <div className="flex sm:flex-col flex-row  sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto">
            <div className=" flex flex-col min-w-20 sm:ml-0 ml-2 sm:w-auto w-full">
              <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                <h1
                  className={`sm:text-xl text-xl md:text-2xl font-bold mb-2 text-${levelData.color}-500`}
                >
                  Nivel {levelData.level}
                </h1>
                <p className="md:text-lg sm:text-sm text-sm">
                  Ronda:{" "}
                  <span className={`font-semibold text-${levelData.color}-500`}>
                    {currentRound}
                  </span>{" "}
                  / {MAX_TURNS}
                </p>
              </div>

              <TargetNumbers />
            </div>

            <MarkedPositionsBoard />
          </div>

          <PlayerBoard />
        </div>

        {/* Contenedor dinámico para mostrar los tableros de los bots */}

        {/* <div
          className={`grid gap-3 mb-4 mt-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mx-auto container ${
            viewPlayerBoard === false ? "grid" : "hidden"
          } sm:grid`}
        >
          {
            // Grupo de los bots
            bots.map((bot, index) => (
              <BotView
                key={bot.name}
                // levelData={dataLevel.level}
                currentTargets={currentTargets}
                interval={bot.interval}
                name={bot.name}
                patterns={winnerPatters}
                boards={bot.boards}
                // Obtiene los tableros del siguiente bot en la lista, o 0 si no hay más
                nextBoards={bot.boards ? dataLevel!.bots[index + 1]?.boards : 0}
              />
            ))
          }
        </div> */}
      </div>

      {/* Botón en la esquina inferior derecha de la pantalla, visible solo en pantallas pequeñas */}
      {/* <div className="fixed bottom-4 right-4 text-right sm:hidden">
        <button
          className={`bg-${levelData.color}-500 p-3 rounded-full shadow-lg `}
          onClick={handleChangeViewPlayerBoard}
        >
          {viewPlayerBoard === true ? (
            <img src="images/bot.svg" alt="Bot" className="w-8 h-8" />
          ) : (
            <img src="images/board.svg" alt="Jugador" className="w-8 h-8" />
          )}
        </button>
      </div> */}

      {/* Ventana modal que se ve al empezar un nivel */}
      <StatusGameModal />

      {/* {
        // Muestra la ventana modal si el bot ha ganado
        winner === "bot" && (
          <StatusModalWithButton modal={DEFEAT_MODAL} initialState={true} />
        )
      }

      {
        // Ventana modal si ha pasado el limite de turnos
        currentRound === MAX_TURNS && winner === "end" && (
          <StatusModalWithButton
            modal={NO_MORE_ROUNDS_MODAL}
            initialState={true}
          />
        )
      } */}

      {/* <button
        onClick={() => {
          unlockLevel(levelData.level + 1);
          navigate(`/level_${levelData.level + 1}`);
        }}
      >
        Siguiente nivel
      </button> */}
    </>
  );
}
