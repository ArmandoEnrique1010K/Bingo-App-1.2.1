import { useAppStore } from "../../store/useAppStore";

type BotBingoCellProps = {
  idBoard: string;
  cell: { number: number; position: number };
  botName: string
};

// Componente para mostrar una celda del tablero de un bot
export default function BotBingoCell({ idBoard, cell, botName }: BotBingoCellProps) {
  const { position, number } = cell;
  const levelData = useAppStore((state) => state.levelData);
  const botMarkedCells = useAppStore((state) => state.botMarkedCells);
  const unmarkNumberBotOnNumberClick = useAppStore((state) => state.unmarkNumberBotOnNumberClick);

  const unmarkNumberBot = useAppStore((state) => state.unmarkNumberBot);

  // El powerup para ver los numeros de los tableros de los bots
  const viewAllBotBoards = useAppStore((state) => state.viewAllBotBoards);

  const { color } = levelData;

  const isMarked = botMarkedCells.some((bot) =>
    bot.boards.some(
      (board) =>
        board.id === idBoard &&
        board.cells.some((c) => c.position === position)
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
          {position === 13 ? "F" : isMarked ? number : viewAllBotBoards.active ? number : ""}
        </div>

      )


  );
}
