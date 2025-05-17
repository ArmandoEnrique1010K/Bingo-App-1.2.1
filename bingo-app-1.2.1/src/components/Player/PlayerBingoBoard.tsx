import { useAppStore } from "../../store/useAppStore";
import PlayerBingoColumn from "./PlayerBingoColumn";
import PlayerBoardControls from "./PlayerBoardControls";

export default function PlayerBingoBoard() {
  const levelData = useAppStore((state) => state.levelData);
  const playerBoards = useAppStore((state) => state.playerBoards);
  const currentBoard = useAppStore((state) => state.currentBoard);

  // if (playerBoards.length === 0) {
  //   console.log("NO HAY TABLEROS");
  // }

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
                      playerBoards.find((b) => b.id === index + 1)?.board || []
                    }
                    boardId={index + 1}
                    min={i * 5 + 1}
                    max={(i + 1) * 5}
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
