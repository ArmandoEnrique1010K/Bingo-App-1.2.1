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

  const location = useLocation();
  const checkWinnerPatternBot = useAppStore(
    (state) => state.checkWinnerPatternBot
  );
  const declareBotWinnerGame = useAppStore((state) => state.declareBotWinnerGame);
  const winner = useAppStore((state) => state.winner);

  const botMarkedCells = useAppStore((state) => state.botMarkedCells);

  const confirmedWinners = useAppStore((state) => state.confirmedWinners);
  const gameEnded = useAppStore((state) => state.gameEnded);
  const setConfirmedWinner = useAppStore((state) => state.setConfirmedWinner);
  // const declareBotWinner = useAppStore((state) => state.declareBotWinner);

  const boardTimeoutsRef = useRef<{ [key: string]: number }>({}); // ✅ Almacena los timeouts activos

  // Eliminación de bot
  const killBot = useAppStore((state) => state.killBot);
  const botBoards = useAppStore((state) => state.botBoards);
  const killedBotName = useAppStore((state) => state.killedBotName);
  // const unmarkNumberBot= useAppStore((state) => state.unmarkNumberBot);
  const hasKillAllBot = useAppStore((state) => state.hasKillAllBot);

  const listOfBotsWinners = useAppStore((state) => state.listOfBotsWinners);

  useEffect(() => {
    // Si el juego ha terminado, no es necesario verificar patrones ganadores
    if (gameEnded) {
      console.log('El juego ha terminado, no se seguirá evaluando si el bot tiene el patrón ganador')
      return;
    }

    checkWinnerPatternBot();

    // Verifica si algún bot ha completado un patrón ganador
    // Retorna un array con información de los bots ganadores o un array vacío si no hay ganadores
    const winnerInfos = listOfBotsWinners || [];

    // Si no hay bots ganadores, salir de la función
    if (!winnerInfos.length) return;

    // Para cada bot ganador encontrado
    winnerInfos.forEach((info) => {
      // Crear una clave única para identificar al bot y su tablero
      const key = `${info.botName}-${info.boardId}`;
      // Tiempo de reacción del bot (cada bot puede tener un tiempo distinto)
      const reactionTime = info.reactionTime;

      // Solo procesar si este bot específico no ha sido declarado ganador antes
      if (!confirmedWinners[key]) {

        // Marcar este bot como ganador para evitar procesamientos duplicados
        setConfirmedWinner(info.botName, info.boardId);

        // Configurar un temporizador para la declaración de victoria del bot
        const timeoutId = setTimeout(() => {
          // Verificar nuevamente si el juego ha terminado (doble verificación de seguridad)
          if (gameEnded) {
            clearTimeout(timeoutId);
            return;
          }

          // TODO: AQUI DEBERIA EVALUAR SI EL BOT TIENE EL PATRON GANADOR
          // SI NO LO TIENE, DETENER EL TIMEOUT
          // if (!listOfBotsWinners.length) {
          //   clearTimeout(timeoutId);
          //   return;
          // }

          console.log(`El bot ${info.botName} grita victoria en el tablero ${info.boardId}`);

          // 1. Marcar el juego como terminado
          useAppStore.setState({
            gameEnded: true,
            winner: "bot"
          });

          // 2. Ejecutar acciones de victoria del bot
          console.log(`🏆 ¡El bot ${info.botName} ha ganado! Fin del juego.`);
          declareBotWinnerGame();
          // declareBotWinner(info.botName);

          // Limpiar todos los demás timeouts para evitar ejecuciones múltiples
          Object.keys(boardTimeoutsRef.current).forEach((botKey) => {
            if (boardTimeoutsRef.current[botKey] !== timeoutId) {
              clearTimeout(boardTimeoutsRef.current[botKey]);
            }
            delete boardTimeoutsRef.current[botKey];
          });
        }, reactionTime);

        // Guardar la referencia del timeout para poder cancelarlo si es necesario
        boardTimeoutsRef.current[key] = timeoutId;
      }
    });
  }, [botMarkedCells, gameEnded]); // Se ejecuta cuando cambian las celdas marcadas por los bots o el estado del juego

  // ✅ Cancela todos los `setTimeout` si el jugador gana
  useEffect(() => {
    if (winner === "player") {
      // console.log(
      //   "🏆 ¡El jugador ha ganado! Cancelando todos los tiempos de espera..."
      // );
      Object.keys(boardTimeoutsRef.current).forEach((botKey) => {
        clearTimeout(boardTimeoutsRef.current[botKey]);
        delete boardTimeoutsRef.current[botKey];
      });

      useAppStore.setState({ gameEnded: true }); // 🚫 Bloquea futuras evaluaciones
    }

    if (winner === "bot" || winner === "end") {
      // console.log(
      //   "🏆 ¡El bot ha ganado! Cancelando todos los tiempos de espera..."
      // );
      Object.keys(boardTimeoutsRef.current).forEach((botKey) => {
        clearTimeout(boardTimeoutsRef.current[botKey]);
        delete boardTimeoutsRef.current[botKey];
      });


      // Solamente si el jugador ha activado el powerup 'desmarcar un numero del tablero del bot'
      // El bot debera volver a evaluar si tiene el patron ganador

      useAppStore.setState({ gameEnded: true }); // 🚫 Bloquea futuras evaluaciones
    }

    // TODO: EVALUAR ESTO
    // if (unmarkNumberBot.hasActivated) {
    //   console.log('El jugador ha desmarcado un numero del tablero del bot')
    //   console.log('Reevaluando si el bot tiene el patron ganador')
    //   checkWinnerPatternBot();
    // }


  }, [winner, location.pathname, /*unmarkNumberBot*/]);

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
      console.log('Se ha eliminado un bot, renderizando nuevamente los bots')
      // Renderizar nuevamente los bots si se ha eliminado uno de ellos
      botBoards.filter(b => b.name !== killedBotName)

      // SI NO HAY BOTS DISPONIBLES, SE ACABA LA PARTIDA POR TRAMPA
      if (botBoards.length === 0) {
        console.log('No hay bots disponibles, se acabo la partida por haber hecho trampa')
        hasKillAllBot();
      }
    }
  }, [killBot.hasActivated])

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
                    interval={bot.interval}
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