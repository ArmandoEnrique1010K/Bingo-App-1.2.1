import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "./BotBingoBoard";

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
  const markCellBot = useAppStore((state) => state.markCellBot);

  useEffect(() => {
    if (currentTargets.length !== 0) {
      setTimeout(() => {
        markCellBot(name, interval);
      }, 1000);
    }
  }, [currentTargets]);

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
      </div>
    </div>
  );
}
