import { CLICK_SOUND } from "../../constants/audioSettings";
import { useAppStore } from "../../store/useAppStore";

export default function PlayerBoardControls() {
  const levelData = useAppStore((state) => state.levelData);
  const { color } = levelData;

  const currentBoard = useAppStore((state) => state.currentBoard);
  const { id } = currentBoard;

  const playerBoards = useAppStore((state) => state.playerBoards);
  const playSound = useAppStore((state) => state.playSound);

  const changeCurrentBoard = useAppStore((state) => state.changeCurrentBoard);

  const getButtonClasses = (isDisabled: boolean) =>
    `px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md transition duration-300 w-full shadow-black ${
      isDisabled
        ? "bg-gray-500 text-white cursor-not-allowed"
        : `bg-${color}-500 text-white cursor-pointer`
    }`;

  return (
    <div className="bg-gray-700 flex flex-col px-3 sm:mx-0 mx-3 gap-3 rounded-xl py-4">
      <div className="flex flex-row justify-between gap-4">
        <button
          className={getButtonClasses(id === 1)}
          onClick={() => {
            changeCurrentBoard(id - 1);
            playSound(CLICK_SOUND);
          }}
          disabled={id === 1}
        >
          Anterior
        </button>
        <div className="px-4 py-3 font-semibold rounded-lg shadow-md transition duration-300 w-1/4 shadow-black text-center justify-center bg-gray-500">
          {id}
        </div>
        <button
          className={getButtonClasses(id === playerBoards.length)}
          onClick={() => {
            changeCurrentBoard(id + 1);
            playSound(CLICK_SOUND);
          }}
          disabled={id === playerBoards.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
