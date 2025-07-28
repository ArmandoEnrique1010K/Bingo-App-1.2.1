import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useAppStore } from "../../store/useAppStore";
import PlayerBingoColumn from "./PlayerBingoColumn";
import PlayerBoardControls from "./PlayerBoardControls";

export default function PlayerBingoBoard() {
  const levelData = useAppStore((state) => state.levelData);
  const playerBoards = useAppStore((state) => state.playerBoards);
  const currentBoard = useAppStore((state) => state.currentBoard);
  const updateBoardPlayer = useAppStore((state) => state.updateBoardPlayer);
  const swapCells = useAppStore((state) => state.swapCells); // Nueva función en el store

  // Esta función se activa luego de arrastrar el elemento
  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    
    if (!over || !active) return;

    const sourceData = active.data.current;
    const targetData = over.data.current;

    if (!sourceData || !targetData) return;

    // Caso 1: Mismo tablero y misma columna (reordenar verticalmente)
    if (
      sourceData.boardId === targetData.boardId && 
      sourceData.columnId === targetData.columnId
    ) {
      // Intercambiar las posiciones (números) dentro de la misma columna
      swapCells(
        sourceData.boardId,
        sourceData.position,
        targetData.position
      );
      return;
    }



    // Intercambiar los números entre columnas
    updateBoardPlayer(
      sourceData.boardId, 
      sourceData.columnId, 
      targetData.number, 
      sourceData.position
    );
    

      // https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientsetquerydata
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4 sm:mx-0 mx-auto">
        <div className="flex flex-col sm:flex-row  mx-auto border-4 border-gray-700 rounded-xl">
          {Array.from({ length: levelData.boards }).map(
            (_, index) =>
              currentBoard.id === index + 1 && (
                <div
                  key={index}
                  className="flex flex-row gap-2 sm:p-2 md:p-4 p-2 bg-gray-700 justify-center items-center"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <PlayerBingoColumn
                      key={i}
                      columnId={i}
                      numberBoard={
                        playerBoards
                          .find((b) => b.id === index + 1)
                          ?.board.filter(
                            (p) =>
                              p.position >= i * 5 + 1 && p.position <= (i + 1) * 5
                          ) || []
                      }
                      boardId={index + 1}
                    />
                  ))}
                </div>
              )
          )}
        </div>
      <PlayerBoardControls />
    </div>
    </DndContext>
  );
}