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
  const markNeighborgNumbers = useAppStore((state) => state.markNeighborgNumbers);
  const markNeighborgNumbersOnNumberClick = useAppStore(
    (state) => state.markNeighborgNumbersOnNumberClick
  );
  const markedCells = useAppStore((state) => state.markedCells);
  // const swapNumberBoardOnNumbersClicks = useAppStore(
  //   (state) => state.swapNumberBoardOnNumbersClicks
  // );
  const swapNumbersBoard = useAppStore((state) => state.swapNumbersBoard);

  const [cellColor, setcellColor] = useState("gray");


  const selectNumbersFromSwapNumbersBoard = useAppStore((state) => state.selectNumbersFromSwapNumbersBoard);
  // const [swapNumbersSelected, setSwapNumbersSelected] = useState<{
  //   firstNumber: SwapNumberSelected | null;
  //   secondNumber: SwapNumberSelected | null;
  // }>({
  //   firstNumber: null,
  //   secondNumber: null,
  // });
  const handleClick = () => {


    if (swapNumbersBoard.active) {

      selectNumbersFromSwapNumbersBoard({ id: boardId, number, position }, { id: boardId, number, position });
    }

    selectCell(boardId, number, position);
    if (isCellMarked(boardId, position)) {
      setcellColor(color);
    }

    if (markNeighborgNumbers.active) {
      // AGREGA LOS NUMEROS VECINOS AL STATE
      markNeighborgNumbersOnNumberClick(boardId, number);
    }
  };

  const isSelected = useMemo(() => {
    return markedCells.some(
      (b) => b.id === boardId && b.board.some((e) => e.position === position)
    );
  }, [markedCells, boardId, position, swapNumbersBoard.turnsRemaining]);

  useEffect(() => {
    setcellColor(isSelected ? color : "gray");
  }, [markedCells, swapNumbersBoard.turnsRemaining]);

  return (
    <button
      className={`sm:text-xl md:text-2xl text-xl font-bold md:size-14 sm:size-13 size-12 border-none rounded-lg text-white
         bg-${cellColor
        }-500 cursor-pointer shadow-md shadow-black hover:bg-gray-900`}
      onClick={handleClick}
    >
      {number === 0 ? "Free" : number}
    </button>
  );
}
