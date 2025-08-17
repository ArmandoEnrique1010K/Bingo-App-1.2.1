import { useAppStore } from "../../store/useAppStore";
import PlayerBingoColumn from "./PlayerBingoColumn";

export default function PlayerBingoBoard() {
  const playerBoards = useAppStore((state) => state.playerBoards);
  const automaticMarkBoard = useAppStore((state) => state.automaticMarkBoard);
  const selectBoardIdAutomaticMark = useAppStore((state) => state.selectBoardIdAutomaticMark);
  const selectedBoardIdAutomaticMark = useAppStore((state) => state.selectedBoardIdAutomaticMark);

  return (
    <div className="flex flex-col xl:flex-row justify-center gap-4 sm:mx-0 mx-auto pr-1 pl-1 w-full bg-gray-700 rounded-xl max-w-[71rem]"
    >

      {
        playerBoards.map((board) => (
          <div
            key={board.id}
            className={`flex flex-row gap-2 sm:p-2 md:p-4 p-2 justify-center items-center ${automaticMarkBoard.active && automaticMarkBoard.type === 'oneTime' ? `hover:bg-gray-500 hover:rounded-xl hover:-mx-1 cursor-pointer` : ''}`}
            onClick={() => {
              if (automaticMarkBoard.active && selectedBoardIdAutomaticMark === 0) {
                selectBoardIdAutomaticMark(board.id)
              }
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <PlayerBingoColumn
                key={i}
                numberBoard={
                  board.cells.filter(
                    (p) =>
                      p.position >= i * 5 + 1 && p.position <= (i + 1) * 5
                  ) || []
                }
                boardId={board.id}
              />
            ))}
          </div>
        ))
      }

    </div>
  );
}
