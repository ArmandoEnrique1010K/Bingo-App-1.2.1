import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import PlayerBingoColumn from "./PlayerBingoColumn";
import PlayerBoardControls from "./PlayerBoardControls";

export default function PlayerBingoBoard() {
  const levelData = useAppStore((state) => state.levelData);
  const playerBoards = useAppStore((state) => state.playerBoards);
  const currentBoard = useAppStore((state) => state.currentBoard);

  const swapNumbersBoard = useAppStore((state) => state.swapNumbersBoard);


  // Si el jugador ha intercambiado numeros, debe mostrarse el cambio en la vista del usuario
  useEffect(() => {
    if (swapNumbersBoard.turnsRemaining === 0) {
      // Actualizar todos los tableros del jugador
      console.log(playerBoards)
    }
  }, [swapNumbersBoard.turnsRemaining])

  return (
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
  );
}
