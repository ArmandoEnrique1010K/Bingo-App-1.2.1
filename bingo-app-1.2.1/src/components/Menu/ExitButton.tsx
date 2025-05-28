import { XCircleIcon } from "@heroicons/react/24/solid";
import { useAppStore } from "../../store/useAppStore";

export default function ExitButton() {
  const levelData = useAppStore((state) => state.levelData);
  const { color } = levelData;

  const openExitLevelModal = useAppStore((state) => state.openExitLevelModal);

  return (
    <>
      <button
        className={`sm:py-4 py-2 px-3 cursor-pointer text-${color}-500`}
        onClick={openExitLevelModal}
      >
        <XCircleIcon className={`sm:w-8 w-6`} />
      </button>
    </>
  );
}
