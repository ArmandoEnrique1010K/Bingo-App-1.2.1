import { useAppStore } from "../../store/useAppStore";

type BotBingoCellProps = {
  idBoard: string;
  value: { number: number; position: number };
  botName: string
};

export default function BotBingoCell({ idBoard, value, botName }: BotBingoCellProps) {
  const { position, number } = value;
  const levelData = useAppStore((state) => state.levelData);
  const botMarkedCells = useAppStore((state) => state.botMarkedCells);
  const unmarkNumberBotOnNumberClick = useAppStore((state) => state.unmarkNumberBotOnNumberClick);

  const unmarkNumberBot = useAppStore((state) => state.unmarkNumberBot);


  const { color } = levelData;

  const isMarked = botMarkedCells.some((bot) =>
    bot.boards.some(
      (board) =>
        board.id === idBoard &&
        board.board.some((cell) => cell.position === position)
    )
  );

  return (
    unmarkNumberBot.active
      ? (
        <button
          className={`cursor-pointer hover:bg-black text-xs sm:text-sm sm:size-6 size-5 text-center sm:border-2 border-1 border-gray-600 text-white bg-${isMarked ? color : "gray"
            }-500 `}
          onClick={() => {
            unmarkNumberBotOnNumberClick(botName, idBoard, number)
          }}
        >
          {position === 13 ? "F" : isMarked ? number : ""}
        </button>

      ) : (
        <div
          className={`text-xs sm:text-sm sm:size-6 size-5 text-center sm:border-2 border-1 border-gray-600 text-white bg-${isMarked ? color : "gray"
            }-500 `}
        >
          {position === 13 ? "F" : isMarked ? number : ""}
        </div>

      )


  );
}
