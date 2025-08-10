import { useAppStore } from "../../store/useAppStore";
import PlayerBingoColumn from "./PlayerBingoColumn";
// import PlayerBoardControls from "./PlayerBoardControls";

export default function PlayerBingoBoard() {
  const playerBoards = useAppStore((state) => state.playerBoards);

  // const swapNumbersBoard = useAppStore((state) => state.swapNumbersBoard);

  const automaticMarkBoard = useAppStore((state) => state.automaticMarkBoard);
  const selectBoardIdAutomaticMark = useAppStore((state) => state.selectBoardIdAutomaticMark);
  const selectedBoardIdAutomaticMark = useAppStore((state) => state.selectedBoardIdAutomaticMark);
  // Si el jugador ha intercambiado numeros, debe mostrarse el cambio en la vista del usuario
  // useEffect(() => {
  //   if (swapNumbersBoard.turnsRemaining === 0) {
  //     // Actualizar todos los tableros del jugador
  //     console.log(playerBoards)
  //   }
  // }, [swapNumbersBoard.turnsRemaining])

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
                // console.log('Automatic mark board is active' + board.id)
                selectBoardIdAutomaticMark(board.id)
              }
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <PlayerBingoColumn
                key={i}
                numberBoard={
                  board.board.filter(
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

      {/* {Array.from({ length: levelData.boards }).map(
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
        )} */}
      {/* <PlayerBoardControls /> */}
    </div>
  );
}
