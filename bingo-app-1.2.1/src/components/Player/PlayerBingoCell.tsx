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
  const isSelected = useMemo(() => {
    return selectedNumbersAndPositions.some(
      (b) => b.id === boardId && b.board.some((e) => e.position === position)
    );
  }, [selectedNumbersAndPositions, boardId, position]);

  // TODO: SI PINTA LOS COLORES EN EL TABLERO, PERO TAMBIEN OCASIONA QUE SE EVALUE LA SIGUIENTE FUNCIÓN
  useEffect(() => {
    // const isSelected = checkSelectedNumber(boardId, position);
    setcellColor(isSelected ? color : "gray");
  }, [selectedNumbersAndPositions]);

  // checkSelectedNumber: (idBoard: number, position: number) => {
  //   const isSelected = get().selectedNumbersAndPositions.some(
  //     (b) => b.id === idBoard && b.board.some((e) => e.position === position)
  //   );
  //   if (isSelected) {
  //     console.log('ESE NUMERO YA FUE MARCADO');
  //   } else {
  //     console.log('ESE NUMERO NO HA SIDO MARCADO');
  //   }
  //   return isSelected;
  // },

  // // TODO: SE DEBERIA PINTAR DE COLOR AZUL TODAS LAS CELDAS QUE SON MARCADAS
  // useEffect(() => {
  //   setcellColor("gray");
  // }, [playerBoards]);

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
