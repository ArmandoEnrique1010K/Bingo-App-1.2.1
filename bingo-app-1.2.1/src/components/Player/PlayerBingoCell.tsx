import { useEffect, useMemo, useState } from "react";
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

  const isCellMarked = useAppStore((state) => state.isCellMarked);

  const selectCell = useAppStore((state) => state.selectCell);
  const powerups = useAppStore((state) => state.powerups);
  const activateMarkNeighborgOnNumberClick = useAppStore(
    (state) => state.activateMarkNeighborgOnNumberClick
  );
  const markedCells = useAppStore((state) => state.markedCells);

  const [cellColor, setcellColor] = useState("gray");

  const handleClick = () => {
    selectCell(boardId, number, position);
    if (isCellMarked(boardId, position)) {
      setcellColor(color);
    }

    if (powerups.markNeighborgNumbers.active) {
      // AGREGA LOS NUMEROS VECINOS AL STATE
      activateMarkNeighborgOnNumberClick(boardId, number);
    }
  };
  const isSelected = useMemo(() => {
    return markedCells.some(
      (b) => b.id === boardId && b.board.some((e) => e.position === position)
    );
  }, [markedCells, boardId, position]);

  useEffect(() => {
    setcellColor(isSelected ? color : "gray");
  }, [markedCells]);

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
