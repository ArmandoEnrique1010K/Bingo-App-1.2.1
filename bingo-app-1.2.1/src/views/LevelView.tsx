import { useAppStore } from "../store/useAppStore";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import StatusGameModal from "../components/Status/StatusGameModal";
import TargetNumbers from "../components/Targets/TargetNumbers";
import MarkedPositionsBoard from "../components/Pattern/ObjectivePattern";
import PlayerBoard from "../components/Player/PlayerBingoBoard";
import { START_LEVEL_MODAL } from "../constants/statusModalsText";
import { MAX_TURNS } from "../constants/defaultConfigs";
import BotOpponent from "../components/Bots/BotOpponent";

export default function LevelView() {
  const levelData = useAppStore((state) => state.levelData);
  // const startMusic = useAppStore((state) => state.startMusic);
  // const stopMusic = useAppStore((state) => state.stopMusic);
  // const isPlayingMusic = useAppStore((state) => state.isPlayingMusic);
  const changeStatusModal = useAppStore((state) => state.changeStatusModal);
  const resetLevel = useAppStore((state) => state.resetLevel);
  const currentRound = useAppStore((state) => state.currentRound);
  const findNumbersOnBoards = useAppStore((state) => state.findNumbersOnBoards);
  const currentTargets = useAppStore((state) => state.currentTargets);
  // const changeMusic = useAppStore((state) => state.changeMusic);

  const location = useLocation();
  const checkWinnerPatternBot = useAppStore(
    (state) => state.checkWinnerPatternBot
  );
  const botWinner = useAppStore((state) => state.botWinner);
  const winner = useAppStore((state) => state.winner);

  const botSelectedNumbersAndPositions = useAppStore(
    (state) => state.botSelectedNumbersAndPositions
  );

  const confirmedWinners = useAppStore((state) => state.confirmedWinners);
  const gameEnded = useAppStore((state) => state.gameEnded);
  const setConfirmedWinner = useAppStore((state) => state.setConfirmedWinner);
  const declareBotWinner = useAppStore((state) => state.declareBotWinner);

  const boardTimeoutsRef = useRef<{ [key: string]: number }>({}); // ✅ Almacena los timeouts activos

  // TODO: FALTA EVITAR QUE LA FUNCIÓN QUE DETERMINA AL BOT COMO GANADOR SE DETENGA SI EL JUGADOR HA GANADO, TAMBIEN SI NO HAY TURNOS DISPONIBLES
  // TODO: TAMBIEN SI EL JUGADOR HA GANADO, EL BOT DEBERIA DEJAR DE SEGUIR MARCANDO TABLEROS Y LOS NUMEROS OBJETIVOS DEBEN ESTAR EN BLANCO
  // TODO: TAMBIEN DEBE DEJAR DE SEGUIR EJECUTANDO SI EL JUGADOR HA SALIDO DEL NIVEL
  // TODO: SI EL BOT HA GANADO, DEBE DEJAR DE MARCAR LOS NUMEROS
  useEffect(() => {
    if (winner === "bot" || winner === "end" || winner === "player") return;

    if (gameEnded) return; // ✅ Si el juego ya terminó, no evaluar más

    const winnerInfos = checkWinnerPatternBot() || [];
    if (!winnerInfos.length) return;

    winnerInfos.forEach((info) => {
      const key = `${info.botName}-${info.boardId}`;
      const reactionTime = info.reactionTime; // 🔥 Cada bot tiene un tiempo distinto

      if (!confirmedWinners[key] && !gameEnded) {
        // ✅ Solo inicia si el bot aún no fue declarado ganador
        console.log(
          `🏆 ${info.botName} ha encontrado un patrón. Esperando ${reactionTime}ms...`
        );

        setConfirmedWinner(info.botName, info.boardId);
        // confirmedWinners[key] = reactionTime;

        const timeoutId = setTimeout(() => {
          if (winner === "bot" || winner === "end" || winner === "player")
            return;
          if (gameEnded) return;

          botWinner(info.botName); // 🚀 Declara ganador
          declareBotWinner(info.botName); // 🚫 Bloquea evaluaciones futuras

          // 🔥 Limpia todos los demás `setTimeout` para evitar múltiples llamadas a `botWinner`
          Object.keys(boardTimeoutsRef.current).forEach((botKey) => {
            clearTimeout(boardTimeoutsRef.current[botKey]);
            delete boardTimeoutsRef.current[botKey];
          });
        }, reactionTime);

        // ✅ Guarda el timeout actual en `boardTimeoutsRef`
        boardTimeoutsRef.current[key] = timeoutId;
      }
    });
  }, [botSelectedNumbersAndPositions, winner]); // ✅ Se ejecuta cuando los números marcados cambian

  useEffect(() => {
    // getLevelNumberFromUrl(location.pathname);
    changeStatusModal(START_LEVEL_MODAL);
  }, [location.pathname]);

  useEffect(() => {
    // TIP: NO OLVIDAR LOS VALORES TRUTHY AND FALSY
    resetLevel();
    // changeMusic(levelData.music);

    // stopMusic();
    // if (isPlayingMusic) {
    //   startMusic(levelData.music);
    // } else {
    //   stopMusic();
    // }

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
