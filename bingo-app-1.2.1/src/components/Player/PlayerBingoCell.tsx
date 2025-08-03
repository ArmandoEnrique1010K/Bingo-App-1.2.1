import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { SwapNumberSelected } from "../../types";

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
  const swapNumberBoardOnNumbersClicks = useAppStore(
    (state) => state.swapNumberBoardOnNumbersClicks
  );
  const swapNumbersBoard = useAppStore((state) => state.swapNumbersBoard);

  const [cellColor, setcellColor] = useState("gray");


  const [swapNumbersSelected, setSwapNumbersSelected] = useState<{
    firstNumber: SwapNumberSelected | null;
    secondNumber: SwapNumberSelected | null;
  }>({
    firstNumber: null,
    secondNumber: null,
  });
  const handleClick = () => {


    if (swapNumbersBoard.active) {

      // Debe llamar 2 veces a la funcion swapNumberBoardOnNumbersClicks para asignar los numeros
      // console.log('Seleccionando numeros para intercambiar ' + number)
      // swapNumberBoardOnNumbersClicks(boardId, number, position);
      if (!swapNumbersSelected.firstNumber) {
        console.log(`Seleccionando primer numero ${boardId} ${position} ${number}`)
        setSwapNumbersSelected({ firstNumber: { id: boardId, number, position }, secondNumber: null });
      } else if (!swapNumbersSelected.secondNumber) {
        const updatedState = {
          firstNumber: swapNumbersSelected.firstNumber,
          secondNumber: { id: boardId, number, position },
        };

        console.log(`Seleccionando segundo numero ${boardId} ${position} ${number}`)

        // Si ha seleccionado el primer numero y luego vuelve hacer clic en el mismo numero, se debe deseleccionar
        if (swapNumbersSelected.firstNumber?.id === boardId &&
          swapNumbersSelected.firstNumber?.number === number &&
          swapNumbersSelected.firstNumber?.position === position) {
          setSwapNumbersSelected({ firstNumber: null, secondNumber: null });
          console.log(`Deseleccionando primer numero ${boardId} ${position} ${number}`)
          return;
        }


        // Error, el id de ambos tableros debe ser el mismo, de lo contrario no se puede intercambiar
        if (updatedState.firstNumber.id !== updatedState.secondNumber.id) {
          console.log(`Error, el id de ambos tableros debe ser el mismo, de lo contrario no se puede intercambiar`)
          return;
        }

        console.log(`Intercambiando numeros ${updatedState.firstNumber.number} y ${updatedState.secondNumber.number}`)
        setSwapNumbersSelected(updatedState);

        // Llama a la acción para intercambiar
        swapNumberBoardOnNumbersClicks(updatedState.firstNumber, updatedState.secondNumber);

        // Opcional: reiniciar selección
        setSwapNumbersSelected({ firstNumber: null, secondNumber: null });

        // Opcional: actualizar `turnsRemaining`
        // Aquí podrías restar 1 a turnsRemaining y desactivar el modo si ya se usó
      }

      return; // Para evitar que se mezclen con otras lógicas de click



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
  }, [markedCells, boardId, position]);

  useEffect(() => {
    setcellColor(isSelected ? color : "gray");
  }, [markedCells]);

  return (
    <button
      className={`sm:text-xl md:text-2xl text-xl font-bold md:size-16 sm:size-13 size-12 border-none rounded-lg text-white
         bg-${position === 13 ? color : cellColor
        }-500 cursor-pointer shadow-md shadow-black hover:bg-gray-900`}
      onClick={handleClick}
    >
      {position === 13 ? "Free" : number}
    </button>
  );
}
