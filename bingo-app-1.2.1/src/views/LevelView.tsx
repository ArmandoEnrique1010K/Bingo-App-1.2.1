import { useAppStore } from "../store/useAppStore";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import StatusGameModal from "../components/Status/StatusGameModal";
import TargetNumbers from "../components/Targets/TargetNumbers";
import MarkedPositionsBoard from "../components/Pattern/ObjectivePattern";
import PlayerBoard from "../components/Player/PlayerBingoBoard";
import { START_LEVEL_MODAL } from "../constants/statusModalsText";
import { BOT_REACTION_DELAY, MAX_TURNS } from "../constants/defaultConfigs";
import BotOpponent from "../components/Bots/BotOpponent";

export default function LevelView() {
  const levelData = useAppStore((state) => state.levelData);
  const startMusic = useAppStore((state) => state.startMusic);
  const stopMusic = useAppStore((state) => state.stopMusic);
  const isPlayingMusic = useAppStore((state) => state.isPlayingMusic);
  const changeStatusModal = useAppStore((state) => state.changeStatusModal);
  const resetLevel = useAppStore((state) => state.resetLevel);
  const currentRound = useAppStore((state) => state.currentRound);
  const findNumbersOnBoards = useAppStore((state) => state.findNumbersOnBoards);
  const currentTargets = useAppStore((state) => state.currentTargets);

  const location = useLocation();
  const checkWinnerPatternBot = useAppStore(
    (state) => state.checkWinnerPatternBot
  );
  const botWinner = useAppStore((state) => state.botWinner);
  const winner = useAppStore((state) => state.winner);

  const botSelectedNumbersAndPositions = useAppStore(
    (state) => state.botSelectedNumbersAndPositions
  );
  // const timeoutsIds = useAppStore((state) => state.timeoutsIds);
  // const updateTimeoutsIds = useAppStore((state) => state.updateTimeoutsIds);

  // const dataBotWinner = useAppStore((state) => state.dataBotWinner);
  // // ...otros hooks...
  // const timeoutRef = useRef<number | null>(null);

  const confirmedWinnersRef = useRef<{ [key: string]: boolean }>({});
  const boardTimeoutsRef = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const winnerInfos = checkWinnerPatternBot() || [];

    if (!winnerInfos.length) return;

    const updatedWinners: { [key: string]: boolean } = {};

    winnerInfos.forEach((info) => {
      const key = `${info.botName}-${info.boardId}`;

      updatedWinners[key] = true;
    });

    // ✅ Compara nuevos ganadores con los anteriores
    const newWinnersKeys = Object.keys(updatedWinners);
    const prevWinnersKeys = Object.keys(confirmedWinnersRef.current);

    const winnersChanged = !(
      newWinnersKeys.length === prevWinnersKeys.length &&
      newWinnersKeys.every((key) => prevWinnersKeys.includes(key))
    );

    if (winnersChanged) {
      confirmedWinnersRef.current = updatedWinners; // ✅ Solo actualiza si realmente cambió
    }
  }, [botSelectedNumbersAndPositions]); // 🔥 Se actualiza cuando los números marcados por el bot cambian

  // TODO: DEBE ALMACENAR LOS BOTS GANADORES
  // SI NO HAY NINGUN CAMBIO EN currentWinners, debe mantenerse sin cambios, para que el efecto de abajo no se vuelva a reiniciar a 0 en el setTimeout
  // const winnerBots = useMemo(() => currentWinners, [currentWinners]);

  useEffect(() => {
    const winnerKeys = Object.keys(confirmedWinnersRef.current);

    winnerKeys.forEach((key) => {
      if (!boardTimeoutsRef.current[key]) {
        console.log(
          `🏆 ${key} ha ganado. Evaluando en ${BOT_REACTION_DELAY}ms...`
        );

        boardTimeoutsRef.current[key] = setTimeout(() => {
          const stillWinner = checkWinnerPatternBot()?.some(
            (i) => `${i.botName}-${i.boardId}` === key
          );
          const globalWinner = useAppStore.getState().winner;

          if (stillWinner && globalWinner === "none") {
            botWinner(key.split("-")[0]); // ✅ Extrae el nombre del bot
          }

          delete boardTimeoutsRef.current[key];
        }, BOT_REACTION_DELAY);
      }
    });

    return () => {
      winnerKeys.forEach((key) => clearTimeout(boardTimeoutsRef.current[key]));
    };
  }, [confirmedWinnersRef.current]); // ✅ Se ejecuta solo si los ganadores confirmados cambian
  //   const winnerInfos = checkWinnerPatternBot() || []; // <-- Debe retornar array de {botName, boardId, ...}

  //   // Inicializa `boardTimeoutsRef.current` si no existe
  //   if (!boardTimeoutsRef.current) {
  //     boardTimeoutsRef.current = {};
  //   }

  //   // Después (con objeto)
  //   const currentWinners: { [key: string]: boolean } = {};
  //   winnerInfos?.forEach((info) => {
  //     const key = `${info.botName}-${info.boardId}`;
  //     currentWinners[key] = true;
  //   });
  //   // Lanza timeout para cada tablero ganador nuevo
  //   winnerInfos?.forEach((info) => {
  //     const key = `${info.botName}-${info.boardId}`;
  //     if (!boardTimeoutsRef.current[key]) {
  //       // TODO: SOLAMENTE DEBERIA EVALUAR UNA SOLA VEZ SI HAY UN TABLERO GANADOR
  //       console.log("HAY UN GANADOR, SE ACABARA EL JUEGO EN...");

  //       // TODO: PERO SI LUEGO ESE TABLERO GANADOR FUE EDITADO, ENTONCES DEBERIA VOLVER A HACER LA EVALUACIÓN
  //       boardTimeoutsRef.current[key] = setTimeout(() => {
  //         // Verifica que el tablero siga siendo ganador antes de declarar
  //         const stillWinner = checkWinnerPatternBot()?.some(
  //           (i) => i.botName === info.botName && i.boardId === info.boardId
  //         );

  //         // Consulta el estado global de winner para evitar condiciones de carrera
  //         const globalWinner = useAppStore.getState().winner;

  //         if (
  //           stillWinner &&
  //           globalWinner !== "player" &&
  //           globalWinner !== "end" &&
  //           globalWinner !== "bot"
  //         ) {
  //           botWinner(info.botName);
  //         }
  //         // Limpia el timeout de este tablero
  //         delete boardTimeoutsRef.current[key];
  //       }, BOT_REACTION_DELAY);
  //     }
  //   });

  //   // Cancela timeouts de tableros que ya no son ganadores
  //   Object.keys(boardTimeoutsRef.current).forEach((key) => {
  //     if (!currentWinners[key]) {
  //       clearTimeout(boardTimeoutsRef.current[key]);
  //       delete boardTimeoutsRef.current[key];
  //     }
  //   });
  //   // Limpieza global al desmontar
  //   return () => {
  //     Object.values(boardTimeoutsRef.current).forEach(clearTimeout);
  //     boardTimeoutsRef.current = {};
  //   };
  // }, [botSelectedNumbersAndPositions, winner]);

  useEffect(() => {
    // getLevelNumberFromUrl(location.pathname);
    changeStatusModal(START_LEVEL_MODAL);
  }, [location.pathname]);

  useEffect(() => {
    // TIP: NO OLVIDAR LOS VALORES TRUTHY AND FALSY
    resetLevel();

    stopMusic();
    if (isPlayingMusic) {
      startMusic(levelData.music);
    } else {
      stopMusic();
    }

    console.log("HA CAMBIADO DE NIVEL");
  }, [levelData]);

  useEffect(() => {
    console.log("Encontrando los numeros objetivos: " + currentTargets);
    findNumbersOnBoards(currentTargets);
  }, [currentTargets]);

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

        <div
          className={`grid gap-3 mb-4 mt-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mx-auto container ${
            true // viewPlayerBoard === false ? "grid" : "hidden"
          } sm:grid`}
        >
          {
            // Grupo de los bots
            levelData.bots.map((bot, index) => (
              <BotOpponent
                key={bot.name}
                // levelData={dataLevel.level}
                interval={bot.interval}
                name={bot.name}
                // patterns={winnerPatters}
                boards={bot.boards}
                // Obtiene los tableros del siguiente bot en la lista, o 0 si no hay más
                nextBoards={bot.boards ? levelData!.bots[index + 1]?.boards : 0}
                botIndex={index}
              />
            ))
          }
        </div>
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
