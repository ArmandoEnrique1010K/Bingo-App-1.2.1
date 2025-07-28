import PlayerBingoCell from "./PlayerBingoCell";
import { useDroppable } from '@dnd-kit/core';

type PlayerColumnProps = {
  numberBoard: { position: number; number: number }[];
  boardId: number;
  columnId: number;
};

export default function PlayerBingoColumn({
  boardId,
  numberBoard,
  columnId,
}: PlayerColumnProps) {

// En el componente PlayerBingoColumn, modifica el useDroppable para incluir el número:
const { setNodeRef, isOver } = useDroppable({
  id: `${boardId}-${columnId}`,
  data: {
    boardId,
    columnId,
    // Añade esto para saber qué número está en la posición objetivo
    number: numberBoard.find(n => n.position === 0)?.number
  }
});

  const style = {
    backgroundColor: isOver ? 'rgba(255, 0, 0, 0.1)' : undefined,
  };


  return (
    <>
      <div style={style} ref={setNodeRef} className="flex flex-col gap-2">
        {numberBoard
          .map((n) => (

              <PlayerBingoCell
                key={n.position}
                cellData={{ number: n.number, position: n.position }}
                boardId={boardId}
                columnId={columnId}
              />

          ))}
      </div>
    </>
  );
}
