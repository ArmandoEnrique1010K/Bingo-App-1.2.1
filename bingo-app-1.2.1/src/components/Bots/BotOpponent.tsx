import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "./BotBingoBoard";
import { dynamicInterval } from "../../utils/dynamicInterval";
import { CORRECT_SOUND } from "../../constants/audioSettings";

type BotOpponentProps = {
  // interval: number;
  name: string;
  boards: number;
  nextBoards: number;
  botIndex: number;
  interval: number;
};
export default function BotOpponent({
  // interval,
  name,
  boards,
  nextBoards,
  botIndex,
  interval,
}: BotOpponentProps) {
  const botBoards = useAppStore((state) => state.botBoards);
  const currentTargets = useAppStore((state) => state.currentTargets);
  const findedCells = useAppStore((state) => state.findedCells);
  const updateFindedCells = useAppStore((state) => state.updateFindedCells);
  const resetFindedCells = useAppStore((state) => state.resetFindedCells);
  const winner = useAppStore((state) => state.winner);
  const markCellBot = useAppStore((state) => state.markCellBot);
  const playSound = useAppStore((state) => state.playSound);
  const updateBotSelection = useAppStore((state) => state.updateBotSelection);

  // LOGICA PARA MANEJAR LOS BOTS
  useEffect(() => {
    if (currentTargets.length > 0) {
      // TIP: USO DE FLATMAP
      // const data = [1, 2, 3];
      // const result = data.flatMap((x) => [x, x * 2]);
      // console.log(result); // [1, 2, 2, 4, 3, 6]

      const results = botBoards.flatMap((bot, indexBot) =>
        bot.boards.map((board, indexBoard) => ({
          id: `Bot-${indexBot}-${indexBoard}`,
          targets: board.board.filter((cell) =>
            currentTargets.includes(cell.number)
          ),
        }))
      );

      updateFindedCells(results);
    } else {
      resetFindedCells();
    }
  }, [currentTargets]);

  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  // DEBE MARCAR LOS NUMEROS LUEGO DE UN CIERTO TIEMPO
  useEffect(() => {
    if (!botBoards.length || !currentTargets.length || winner === "bot") return;

    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);

    let currentDelay = 0;
    const newTimeoutIds: number[] = [];

    // Copia de `result` para evitar modificar el estado directamente
    // Mezcla el orden de tableros y objetivos para mayor aleatoriedad
    const dynamicResult = [...findedCells].sort(() => Math.random() - 0.5);

    dynamicResult.forEach((res) => {
      res.targets.sort(() => Math.random() - 0.5);

      res.targets.forEach((t) => {
        // Calcula un intervalo aleatorio
        const randomInterval = dynamicInterval() * interval;
        currentDelay = currentDelay + randomInterval;

        // Marca el número en el tablero luego del tiempo establecido en el intervalo
        const timeoutId = setTimeout(() => {
          // markCellBot(res.id, t.number, t.position);
          playSound(CORRECT_SOUND);

          updateBotSelection(res.id, t.number, t.position);
        }, currentDelay);

        newTimeoutIds.push(timeoutId);
      });
    });
    setTimeoutIds(newTimeoutIds);

    // Limpieza de temporizadores al desmontar el componente
    return () => {
      newTimeoutIds.forEach((id) => clearTimeout(id));
      setTimeoutIds([]);
    };
  }, [findedCells]);

  return (
    <div
      className={`flex flex-col items-center bg-gray-700 p-2 rounded-lg shadow-md  ${
        boards >= 2 ? "col-span-2" : ""
      } ${
        boards < 2 && (nextBoards !== 0 || nextBoards >= 2) ? "col-span-2" : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>
      <div className="flex flex-row gap-4">
        {Array.from({ length: boards }).map((_, boardIndex) => (
          <BotBingoBoard
            key={boardIndex + 1}
            // board={botBoards.find((b) => b.)?.board || []}
            // board={botBoards.

            //   find((b) =>
            //   b.map((m) => m.id === `Bot-${botIndex}-${boardIndex}`)

            //   // ¿PORQUE NO PUEDO RETORNAR m.board
            // )}

            board={
              botBoards
                ?.find((bot) => bot.name === name) // Encuentra el bot correspondiente
                ?.boards.find(
                  (boardObj) => boardObj.id === `Bot-${botIndex}-${boardIndex}`
                )?.board || []
            }
            idBoard={`Bot-${botIndex}-${boardIndex}`}
            // interval={interval}

            //  `Bot-${botIndex}-${boardIndex}`
          />
        ))}

        {/* {Array.from({ length: boards }).map((board, boardIndex) => (
          <BotBingoBoard
            key={boardIndex + 1}
            board={botBoards.find(b => b.id)?.board || []}
            idBoard={index + 1}
            // interval={interval}

            //  `Bot-${botIndex}-${boardIndex}`
          />
        ))} */}

        {/* {botBoards
          .find((bot) => bot.map(b => b.id === `Bot-${a}-${}`)) // Encuentra el bot correcto
          ?.boards.map((boardObj, boardIndex) => (
            <BotBingoBoard
              key={boardObj.id}
              board={boardObj.board || []} // Pasa el tablero correcto
              idBoard={boardObj.id}
              // interval={interval}
            />
          ))} */}
      </div>
    </div>
  );
}
