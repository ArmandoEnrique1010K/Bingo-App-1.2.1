import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "./BotBingoBoard";

type BotOpponentProps = {
  // interval: number;
  name: string;
  boards: number;
  nextBoards: number;
};
export default function BotOpponent({
  // interval,
  name,
  boards,
  nextBoards,
}: BotOpponentProps) {
  const botBoards = useAppStore((state) => state.botBoards);

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
        {Array.from({ length: boards }).map((_, index) => (
          <BotBingoBoard
            key={index + 1}
            board={botBoards.find((b) => b.id === index + 1)?.board || []}
            idBoard={index + 1}
            // interval={interval}
          />
        ))}
      </div>
    </div>
  );
}
