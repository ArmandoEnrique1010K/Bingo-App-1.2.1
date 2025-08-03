import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FINAL_LEVEL, MAX_POWERUPS } from "../../constants/defaultConfigs";
import DefeatMessage from "./DefeatMessage";
import SelectPowerUps from "./PowerUpsContainer";

export default function StatusGameModal() {
  const levelData = useAppStore((state) => state.levelData);
  const modal = useAppStore((state) => state.modal);
  const isStatusModalOpen = useAppStore((state) => state.isStatusModalOpen);
  const closeStatusModal = useAppStore((state) => state.closeStatusModal);
  const openStatusModal = useAppStore((state) => state.openStatusModal);
  const resetLevelState = useAppStore((state) => state.resetLevelState);
  const defaultLevelState = useAppStore((state) => state.defaultLevelState);
  const unlockedPowerUpsIds = useAppStore((state) => state.unlockedPowerUpsIds);
  const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds);

  const { level, color, tip } = levelData;
  const { type, title, message, textButton, subType } = modal;

  const navigate = useNavigate();

  const nextLevel = () => {
    closeStatusModal();
    navigate(`/level_${levelData.level + 1}`);
  };

  const leaveGame = () => {
    closeStatusModal();
    defaultLevelState();
    navigate(`/`);
  };

  const restartLevel = () => {
    closeStatusModal();
    resetLevelState();
  };

  const handlePrimaryAction = () => {
    switch (type) {
      case "victory":
        if (level !== FINAL_LEVEL) {
          nextLevel();
        } else {
          leaveGame();
        }
        break;
      case "exit":
        leaveGame();
        break;
      case "reboot":
        restartLevel();
        break;
      case "defeat":
        restartLevel();
        break;
      default:
        closeStatusModal();
        break;
    }
  };

  const handleSecondaryAction = () => {
    if (type === "exit" || type === "reboot") {
      closeStatusModal();
    } else {
      leaveGame();
    }
  };

  const toogleModal = () => {
    if (type === "exit" || type === "reboot") {
      closeStatusModal();
    } else {
      openStatusModal();
    }
  };


  const verifyQuantityPowerUps = () => {
    return unlockedPowerUpsIds.length > MAX_POWERUPS;
  };

  return (
    <>
      <Dialog
        open={isStatusModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toogleModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-lg bg-white p-4 sm:p-8 shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-black "
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center text-gray-900 mb-6"
              >
                {title}
                {type === "start" && level}
              </DialogTitle>
              <div className="space-y-3 text-lg text-gray-700">

                {type === "start" && verifyQuantityPowerUps() && (
                  <SelectPowerUps />
                )}

                {type === "defeat" && subType === "game_over" ? (
                  <DefeatMessage message={message} />
                ) : (
                  <p className="text-center">{message}</p>
                )}

                {type === "victory" && subType === "level_completed" && (
                  <p className="text-left text-base mt-6"><span className="font-bold">Tip: </span>{tip}</p>
                )}
              </div>

              <div className="mt-6 flex flex-row gap-4">
                {textButton.left && (
                  <button
                    onClick={handlePrimaryAction}
                    className={`w-full py-2 px-4 font-semibold bg-${color}-500 text-white rounded-lg text-lg shadow-md shadow-black hover:bg-gray-900   
                    ${type === "start" && unlockedPowerUpsIds.length >= MAX_POWERUPS && selectedPowerUpsIds.length !== MAX_POWERUPS ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={type === "start" && unlockedPowerUpsIds.length >= MAX_POWERUPS && selectedPowerUpsIds.length !== MAX_POWERUPS}
                  >
                    {textButton.left}
                  </button>
                )}

                {textButton.right && (
                  <button
                    onClick={handleSecondaryAction}
                    className={`w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg  shadow-black shadow-md hover:bg-gray-900 cursor-pointer
                      
                      `}
                  >
                    {textButton.right}
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
