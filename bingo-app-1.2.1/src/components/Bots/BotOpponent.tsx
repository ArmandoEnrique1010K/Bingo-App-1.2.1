import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "./BotBingoBoard";
import { createIdBoard } from "../../utils/Bot/createIdBoard";

type BotOpponentProps = {
  name: string;
  boards: number;
  nextBoards: number;
  botIndex: number;
  interval: number;
};
export default function BotOpponent({
  name,
  boards,
  nextBoards,
  botIndex,
  interval,
}: BotOpponentProps) {
  const botBoards = useAppStore((state) => state.botBoards);
  const currentTargets = useAppStore((state) => state.currentTargets);
  const selectBotCell = useAppStore((state) => state.selectBotCell);
  const winner = useAppStore((state) => state.winner);

  // TODO: MEJORAR ESTO, ELIMINAR EL TIMEOUT
  useEffect(() => {
    if (currentTargets.length !== 0) {
      if (winner !== "bot" && winner !== "player") {
        setTimeout(() => {
          selectBotCell(name, interval);
        }, 0);
      }
    }
  }, [currentTargets, winner, interval]);

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
                ?.find((bot) => bot.name === name)
                ?.boards.find(
                  (boardObj) =>
                    boardObj.id === createIdBoard(botIndex, boardIndex)
                )?.board || []
            }
            idBoard={createIdBoard(botIndex, boardIndex)}
          />
        ))}
      </div>
    </div>
  );
}
