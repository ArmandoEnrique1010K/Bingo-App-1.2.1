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
import SelectedPowerUps from "../components/PowerUps/SelectedPowerUps";

export default function LevelView() {
  const levelData = useAppStore((state) => state.levelData);
  const changeStatusModal = useAppStore((state) => state.changeStatusModal);
  const resetLevelState = useAppStore((state) => state.resetLevelState);
  const currentRound = useAppStore((state) => state.currentRound);
  const findNumbersOnBoards = useAppStore((state) => state.findNumbersOnBoards);
  const currentTargets = useAppStore((state) => state.currentTargets);

  const botMarkedCells = useAppStore((state) => state.botMarkedCells);

  const location = useLocation();
  const checkWinnerPatternBot = useAppStore(
    (state) => state.checkWinnerPatternBot
  );
  const declareBotWinnerGame = useAppStore((state) => state.declareBotWinnerGame);
  const winner = useAppStore((state) => state.winner);


  const gameEnded = useAppStore((state) => state.gameEnded);



  // Eliminación de bot
  const killBot = useAppStore((state) => state.killBot);
  const botBoards = useAppStore((state) => state.botBoards);
  const killedBotName = useAppStore((state) => state.killedBotName);
  const unmarkNumberBot = useAppStore((state) => state.unmarkNumberBot);
  const hasKillAllBot = useAppStore((state) => state.hasKillAllBot);

  const listOfBotsWinners = useAppStore((state) => state.listOfBotsWinners);

  const boardTimeoutsRef = useRef<{ [key: string]: number }>({}); // ✅ Almacena los timeouts activos

  // Verifica patrón en cada cambio de celdas marcadas
  useEffect(() => {
    checkWinnerPatternBot();
  }, [botMarkedCells]);


  // Manejo de ganadores bots
  useEffect(() => {
    if (gameEnded || !listOfBotsWinners?.length) return;

    listOfBotsWinners.forEach(info => {
      const key = `${info.botName}-${info.boardId}`;
      const reactionTime = info.victoryDelay;

      if (!boardTimeoutsRef.current[key]) {
        const timeoutId = window.setTimeout(() => {
          if (!gameEnded) {
            // console.log(`🏆 Bot ${info.botName} gana en tablero ${info.boardId}`);
            declareBotWinnerGame();
            useAppStore.setState({ gameEnded: true, winner: "bot" });
          }
          clearTimeout(timeoutId);
        }, reactionTime);

        boardTimeoutsRef.current[key] = timeoutId;
      }
    });
  }, [listOfBotsWinners, gameEnded]);

  useEffect(() => {
    if (unmarkNumberBot.hasActivated === true) {
      checkWinnerPatternBot();
      // console.log('El jugador ha desmarcado un numero del tablero del bot, volviendo a evaluar si el bot tiene el patron ganador')

      // Cancelar timeouts de bots que ya no estén en la lista de ganadores
      Object.keys(boardTimeoutsRef.current).forEach(key => {
        // console.log(key)
        // Ejemplo: "Strategic-Bot-1-Board-1-1";
        const parts = key.split("-");

        // botName: Strategic-Bot-1 (primeros 3 elementos)
        const botName = parts.slice(0, 3).join("-");

        // boardId: Board-1-1 (últimos 3 elementos)
        const boardId = parts.slice(3).join("-");

        const sigueGanando = listOfBotsWinners.some(
          w => w.botName === botName && w.boardId === boardId
        );
        if (!sigueGanando) {
          // console.log(`El bot ${botName} ya no tiene el patron ganador, cancelando timeout`)
          clearTimeout(boardTimeoutsRef.current[key]);
          delete boardTimeoutsRef.current[key];
          // console.log(`⏹ Timeout cancelado para bot ${botName} tablero ${boardId}`);
        }
      });
    }
  }, [unmarkNumberBot.hasActivated, listOfBotsWinners]);

  useEffect(() => {
    if (killBot.hasActivated === true) {
      checkWinnerPatternBot();
      // console.log('El jugador ha eliminado un bot, volviendo a evaluar si el bot tiene el patron ganador')

      // Cancelar timeouts de bots que ya no estén en la lista de ganadores
      Object.keys(boardTimeoutsRef.current).forEach(key => {
        // console.log(key)
        // Ejemplo: "Strategic-Bot-1-Board-1-1";
        const parts = key.split("-");

        // botName: Strategic-Bot-1 (primeros 3 elementos)
        const botName = parts.slice(0, 3).join("-");

        // boardId: Board-1-1 (últimos 3 elementos)
        const boardId = parts.slice(3).join("-");

        const sigueGanando = listOfBotsWinners.some(
          w => w.botName === botName && w.boardId === boardId
        );
        if (!sigueGanando) {
          // console.log(`El bot ${botName} se ha eliminado, cancelando timeout`)
          clearTimeout(boardTimeoutsRef.current[key]);
          delete boardTimeoutsRef.current[key];
          // console.log(`⏹ Timeout cancelado para bot ${botName} tablero ${boardId}`);
        }
      });
    }

  }, [killBot.hasActivated, listOfBotsWinners])




  // Cancelar timers si gana el jugador o finaliza el juego
  useEffect(() => {
    if (winner) {
      Object.values(boardTimeoutsRef.current).forEach(clearTimeout);
      boardTimeoutsRef.current = {};
    }
  }, [winner]);

  useEffect(() => {
    changeStatusModal(START_LEVEL_MODAL);
  }, [location.pathname]);

  useEffect(() => {
    if (levelData.level !== 0) {
      resetLevelState();
    }
  }, [levelData]);

  useEffect(() => {
    findNumbersOnBoards(currentTargets);
  }, [currentTargets]);

  useEffect(() => {
    if (killBot.hasActivated) {
      // console.log("Se ha eliminado un bot");
      if (botBoards.length === 0) {
        // console.log("No quedan bots → fin de partida por trampa");
        hasKillAllBot();
      }
    }
  }, [killBot.hasActivated]);

  return (
    <>
      <div className="text-white flex justify-center" >
        <div className="container flex flex-col">
          <div className="container py-4 flex sm:flex-row flex-col items-start sm:gap-3 md:gap-4 gap-3 justify-center mx-auto">
            <div className="flex sm:flex-col flex-row  sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto ">
              {/* El asterico (*) indica que los estilos se aplicaran a sus elementos hijos */}
              <div className=" flex flex-col gap-3 min-w-20 sm:ml-0  sm:w-auto w-full *:p-2 ">
                <div className="flex flex-col bg-gray-700 rounded-xl p-2 items-baseline *:mx-auto">
                  <h1
                    className={`text-base sm:text-lg md:text-xl font-bold text-${levelData.color}-500`}
                  >
                    Nivel {levelData.level}
                  </h1>
                  <p className="md:text-base sm:text-sm text-xs">
                    Ronda:{" "}
                    <span className={`font-semibold text-${levelData.color}-500`}>
                      {currentRound}
                    </span>{" "}
                    / {MAX_TURNS}
                  </p>
                </div>

                <TargetNumbers />
                <SelectedPowerUps />
              </div>

              <MarkedPositionsBoard />
            </div>
            <PlayerBoard />


          </div>
          <div
            className={`container grid gap-3 mb-4 mt-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mx-auto  ${true // viewPlayerBoard === false ? "grid" : "hidden"
              } sm:grid 
             `}
          >
            {
              // Grupo de los bots
              levelData.bots.map((bot, index) => (
                // No se va a renderizar el bot eliminado
                bot.name !== killedBotName && (
                  <BotOpponent
                    key={bot.name}
                    // levelData={dataLevel.level}
                    interval={bot.numberMarkDelay}
                    name={bot.name}
                    // patterns={winnerPatters}
                    boards={bot.boards}
                    // Obtiene los tableros del siguiente bot en la lista, o 0 si no hay más
                    nextBoards={bot.boards ? levelData!.bots[index + 1]?.boards : 0}
                    botIndex={index}
                  />
                )
              ))
            }
          </div>

        </div>


        {/* Contenedor dinámico para mostrar los tableros de los bots */}
        {/* max-w-[86rem] */}


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