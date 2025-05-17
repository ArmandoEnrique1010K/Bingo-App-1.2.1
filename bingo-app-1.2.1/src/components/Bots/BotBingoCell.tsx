import { useAppStore } from "../../store/useAppStore";

type BotBingoCellProps = {
  idBoard: number;
  value: { number: number; position: number };
};

export default function BotBingoCell({ idBoard, value }: BotBingoCellProps) {
  const { position, number } = value;

  // const [cellColor, setcellColor] = useState("gray");

  const levelData = useAppStore((state) => state.levelData);

  const { color } = levelData;

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
          position === 13 ? color : "gray"
        }-500
                  `}
      >
        {/* TODO: El bot no muestra los numeros de su tablero */}
        {position === 13 ? "F" : /*""*/ number}
      </div>
    </div>
  );
}
