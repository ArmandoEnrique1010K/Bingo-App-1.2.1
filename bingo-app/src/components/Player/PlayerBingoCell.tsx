import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { POWERUP_SOUND } from "../../constants/audioSettings";

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

  const forceNumberObjectiveCross = useAppStore((state) => state.forceNumberObjectiveCross);
  const activateForceNumberObjectiveCrossOnNumberClick = useAppStore((state) => state.activateForceNumberObjectiveCrossOnNumberClick);

  const playSound = useAppStore((state) => state.playSound);

  const automaticMarkBoard = useAppStore((state) => state.automaticMarkBoard);

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
      // Sale de la función
      return
    }

    if (forceNumberObjectiveCross.active) {
      playSound(POWERUP_SOUND);
      activateForceNumberObjectiveCrossOnNumberClick(boardId, number);

      // Sale de la función
      return
    }

    if (automaticMarkBoard.active && automaticMarkBoard.type === 'oneTime') {
      playSound(POWERUP_SOUND);
      return
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
      (b) => b.id === boardId && b.cells.some((e) => e.position === position)
    );
  }, [markedCells, boardId, position, swapNumbersBoard.turnsRemaining]);

  useEffect(() => {
    setcellColor(isSelected ? color : "gray");
  }, [markedCells, swapNumbersBoard.turnsRemaining]);

  return (
    <button
      className={`sm:text-xl md:text-2xl text-xl  lg:size-16 xl:size-18 xl:text-3xl font-bold md:size-14 sm:size-13 size-12 border-none rounded-lg text-white
         bg-${cellColor
        }-500 cursor-pointer shadow-md shadow-black hover:bg-gray-900 `}
      onClick={handleClick}
    >
      {number === 0 ? "Free" : number}
    </button>
  );
}
