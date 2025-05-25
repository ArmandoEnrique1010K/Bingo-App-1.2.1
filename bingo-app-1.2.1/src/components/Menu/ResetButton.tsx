import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useAppStore } from "../../store/useAppStore";

export default function ResetButton() {
  const levelData = useAppStore((state) => state.levelData);
  const { color } = levelData;

  const resetLevelModal = useAppStore((state) => state.resetLevelModal);

  return (
    <>
      <button
        className={`sm:py-4 py-2 px-3 cursor-pointer text-${color}-500`}
        onClick={() => {
          resetLevelModal();
        }}
      >
        <ArrowPathIcon className={`sm:w-8 w-6`} />
      </button>
    </>
  );
}
