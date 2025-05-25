import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useAppStore } from "../../store/useAppStore";
import CreditsModal from "./Modal/CreditsModal";

export default function CreditsButton() {
  const levelData = useAppStore((state) => state.levelData);
  const openCreditsModal = useAppStore((state) => state.openCreditsModal);
  const startScreenButton = useAppStore((state) => state.startScreenButton);

  const { color } = levelData;

  return (
    <>
      {startScreenButton || (
        <button
          onClick={openCreditsModal}
          className={`sm:py-4 py-2 px-3 text-${color}-500 cursor-pointer`}
        >
          <InformationCircleIcon className="sm:w-8 w-6" aria-hidden="true" />
        </button>
      )}

      <CreditsModal />
    </>
  );
}
