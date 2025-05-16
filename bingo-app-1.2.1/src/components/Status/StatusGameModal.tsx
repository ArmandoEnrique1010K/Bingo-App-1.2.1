import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { FINAL_LEVEL } from "../../constants/defaultConfigs";
import { CLICK_SOUND } from "../../constants/audioSettings";

export default function StatusGameModal() {
  const levelData = useAppStore((state) => state.levelData);
  const modal = useAppStore((state) => state.modal);
  const viewStatusModal = useAppStore((state) => state.viewStatusModal);
  const closeStatusModal = useAppStore((state) => state.closeStatusModal);
  const openStatusModal = useAppStore((state) => state.openStatusModal);
  const resetLevel = useAppStore((state) => state.resetLevel);
  const playSound = useAppStore((state) => state.playSound);

  const navigate = useNavigate();

  function nextLevel() {
    // playSound(CLICK_SOUND);
    navigate(`/level_${levelData.level + 1}`);
    closeStatusModal();
  }

  function leaveGame() {
    // playSound(CLICK_SOUND);
    navigate(`/`);
    closeStatusModal();
  }

  const handleActionButtonLeft = () => {
    if (modal.type === "victory" && levelData.level === FINAL_LEVEL) {
      leaveGame();
    } else if (modal.type === "victory" && levelData.level !== FINAL_LEVEL) {
      nextLevel();
    } else if (modal.type === "exit") {
      leaveGame();
    } else if (modal.type === "defeat") {
      resetLevel();
    } else if (modal.type === "reboot") {
      resetLevel();
    } else {
      closeStatusModal();
    }

    // TODO: AQUI OCURRE UN ERROR INESPERADO, Start time must be strictly greater than previous start time
    playSound(CLICK_SOUND);
  };
  return (
    <>
      <Dialog
        open={viewStatusModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={
          modal.type === "exit" || modal.type === "reboot"
            ? closeStatusModal
            : openStatusModal
        }
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
                {modal.title}
                {modal.type === "start" && levelData.level}
              </DialogTitle>
              <div className="space-y-3 text-lg text-gray-700">
                <p className="text-center">{modal.message}</p>
              </div>

              <div className="mt-10 flex flex-row gap-4">
                {modal.textButton.left && (
                  <Button
                    onClick={handleActionButtonLeft}
                    className={`w-full py-2 px-4 font-semibold bg-${levelData.color}-500 text-white rounded-lg text-lg shadow-md shadow-black hover:bg-gray-900 cursor-pointer`}
                  >
                    {modal.textButton.left}
                  </Button>
                )}

                {modal.textButton.right && (
                  <Button
                    onClick={
                      // TODO: AÑADIR LA FUNCIÓN PLAYSOUND
                      modal.type === "exit" || modal.type === "reboot"
                        ? closeStatusModal
                        : leaveGame
                    }
                    className={`w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg  shadow-black shadow-md hover:bg-gray-900 cursor-pointer`}
                  >
                    {modal.textButton.right}
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
