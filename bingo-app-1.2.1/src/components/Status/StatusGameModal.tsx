import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { FINAL_LEVEL } from "../../constants/defaultConfigs";
import DefeatMessage from "./DefeatMessage";

export default function StatusGameModal() {
  const levelData = useAppStore((state) => state.levelData);
  const modal = useAppStore((state) => state.modal);
  const viewStatusModal = useAppStore((state) => state.viewStatusModal);
  const closeStatusModal = useAppStore((state) => state.closeStatusModal);
  const openStatusModal = useAppStore((state) => state.openStatusModal);
  const clearLevelData = useAppStore((state) => state.clearLevelData);

  const { level, color } = levelData;
  const { type, title, message, textButton, subType } = modal;

  const navigate = useNavigate();

  const nextLevel = () => {
    closeStatusModal();
    navigate(`/level_${levelData.level + 1}`);
  };

  const leaveGame = () => {
    closeStatusModal();
    navigate(`/`);
  };

  const restartLevel = () => {
    closeStatusModal();
    clearLevelData();
  };

  const handleActionButtonLeft = () => {
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
      case "defeat":
        restartLevel();
        break;
      default:
        closeStatusModal();
        break;
    }
  };

  const handleActionButtonRight = () => {
    if (type === "exit" || type === "reboot") {
      closeStatusModal();
    } else {
      leaveGame();
    }
  };

  const handlePreventCloseModal = () => {
    if (type === "exit" || type === "reboot") {
      closeStatusModal();
    } else {
      openStatusModal();
    }
  };

  return (
    <>
      <Dialog
        open={viewStatusModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handlePreventCloseModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-black "
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center text-gray-900 mb-10"
              >
                {title}
                {type === "start" && level}
              </DialogTitle>
              <div className="space-y-3 text-lg text-gray-700">
                {type === "defeat" && subType === "game_over" ? (
                  <DefeatMessage message={message} />
                ) : (
                  <p className="text-center">{message}</p>
                )}
              </div>

              <div className="mt-10 flex flex-row gap-4">
                {textButton.left && (
                  <Button
                    onClick={handleActionButtonLeft}
                    className={`w-full py-2 px-4 font-semibold bg-${color}-500 text-white rounded-lg text-lg shadow-md shadow-black hover:bg-gray-900 cursor-pointer`}
                  >
                    {textButton.left}
                  </Button>
                )}

                {textButton.right && (
                  <Button
                    onClick={handleActionButtonRight}
                    className={`w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg  shadow-black shadow-md hover:bg-gray-900 cursor-pointer`}
                  >
                    {textButton.right}
                  </Button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
