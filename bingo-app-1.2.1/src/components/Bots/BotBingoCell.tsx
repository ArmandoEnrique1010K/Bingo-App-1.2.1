import { useAppStore } from "../../store/useAppStore";

type BotBingoCellProps = {
  idBoard: string;
  value: { number: number; position: number };
};

export default function BotBingoCell({ idBoard, value }: BotBingoCellProps) {
  const { position, number } = value;

  // const [cellColor, setcellColor] = useState("gray");

  const levelData = useAppStore((state) => state.levelData);
  // const markCellBot = useAppStore((state) => state.markCellBot);
  const botSelectedNumbersAndPositions = useAppStore(
    (state) => state.botSelectedNumbersAndPositions
  );

  const { color } = levelData;

  const isMarked = botSelectedNumbersAndPositions.some((bot) =>
    bot.boards.some(
      (board) =>
        board.id === idBoard &&
        board.board.some((cell) => cell.position === position)
    )
  );
  // const handleClick = () => {
  //   markCell(boardId, number, position);
  //   if (checkSelectedNumber(boardId, position)) {
  //     setcellColor(color);
  //   }
  // };

  return (
    <div>
      <div
        className={`text-xs sm:text-sm sm:size-6 size-4 text-center sm:border-2 border-0 border-gray-600 text-white bg-${
          isMarked ? color : "gray"
        }-500`}
      >
        {/* TODO: El bot no muestra los numeros de su tablero */}
        {position === 13 ? "F" : isMarked ? number : ""}
      </div>
    </div>
  );
}
