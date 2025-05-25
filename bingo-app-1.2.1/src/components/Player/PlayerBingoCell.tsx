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
  const powerups = useAppStore((state) => state.powerups);
  const activateMarkNeighborgOnNumberClick = useAppStore(
    (state) => state.activateMarkNeighborgOnNumberClick
  );
  const selectedNumbersAndPositions = useAppStore(
    (state) => state.selectedNumbersAndPositions
  );

  const [cellColor, setcellColor] = useState("gray");

  const handleClick = () => {
    markCell(boardId, number, position);
    if (checkSelectedNumber(boardId, position)) {
      setcellColor(color);
    }

    if (powerups.markNeighborgNumbers.active) {
      // AGREGA LOS NUMEROS VECINOS AL STATE
      activateMarkNeighborgOnNumberClick(boardId, number);
    }
  };

  // useEffect(() => {
  //   setcellColor("gray");
  // }, [selectedNumbersAndPositions]);

  useEffect(() => {
    // setcellColor("gray");
    const isSelected = checkSelectedNumber(boardId, position);
    setcellColor(isSelected ? color : "gray");

    // COLOCAR selectedNumbersAndPositions EN EL ARREGLO DE DEPENDENCIAS SERIA UNA SOLUCIÓN TEMPORAL
  }, [playerBoards, selectedNumbersAndPositions]);

  // useEffect(() => {
  //   const isSelected = checkSelectedNumber(boardId, position);
  //   setcellColor(isSelected ? color : "gray");
  // }, [selectedNumbersAndPositions]);

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
