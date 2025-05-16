import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";

type PlayerSquareProps = {
  cellData: {
    number: number;
    position: number;
  };
  boardId: number;
};

export default function PlayerBingoCell({
  cellData,
  boardId,
}: PlayerSquareProps) {
  const { position, number } = cellData;

  const levelData = useAppStore((state) => state.levelData);
  const { color } = levelData;

  const checkSelectedNumber = useAppStore((state) => state.checkSelectedNumber);

  const markCell = useAppStore((state) => state.markCell);
  const playerBoards = useAppStore((state) => state.playerBoards);

  const [cellColor, setcellColor] = useState("gray");

  const handleClick = () => {
    markCell(boardId, number, position);
    if (checkSelectedNumber(boardId, position)) {
      setcellColor(color);
    }
  };

  useEffect(() => {
    setcellColor("gray");
  }, [playerBoards]);

  return (
    <button
      className={`sm:text-xl md:text-2xl text-xl font-bold md:size-16 sm:size-13 size-12 border-none rounded-lg text-white
         bg-${
           position === 13 ? color : cellColor
         }-500 cursor-pointer shadow-md shadow-black hover:bg-gray-900`}
      onClick={handleClick}
    >
      {position === 13 ? "Free" : number}
    </button>
  );
}
