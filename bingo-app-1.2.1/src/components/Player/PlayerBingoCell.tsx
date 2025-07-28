import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { useDraggable } from "@dnd-kit/core";

type PlayerSquareProps = {
  cellData: {
    number: number;
    position: number;
  };
  boardId: number;
  columnId: number;
};

export default function PlayerBingoCell({
  cellData,
  boardId,
  columnId,
}: PlayerSquareProps) {
  const { position, number } = cellData;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${boardId}-${columnId}-${position}`,
    data: {
      boardId,
      columnId,
      position,
      number // Asegúrate de incluir esto
    }
  });
  

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

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 10
  } : undefined;

  return (
    <button
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
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
