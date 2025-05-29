import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import RotatingPatterns from "./RotatingPatterns";

export default function ObjectivePattern() {
  const levelData = useAppStore((state) => state.levelData);
  const hasWinnerPattern = useAppStore((state) => state.hasWinnerPattern);

  const { color, targetText } = levelData;

  const [buttonText, setButtonText] = useState(targetText);

  useEffect(() => {
    setButtonText(targetText);
  }, [targetText]);

  return (
    <div className="w-full bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col sm:min-w-20 sm:ml-0 sm:mr-0 mr-2 sm:w-auto ">
      <div
        className={`sm:text-xl text-xl md:text-2xl font-semibold text-center mb-2 text-${color}-500`}
      >
        Patrón objetivo
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center text-center m-auto">
        <RotatingPatterns />

        <button
          className={`bg-${levelData.color}-500 text-white font-semibold sm:px-5 px-4 sm:py-3 py-2 text-xs sm:text-sm md:text-base cursor-pointer rounded-lg shadow-black shadow-md hover:bg-gray-900 my-full md:w-36 sm:w-30 w-auto sm:h-auto h-14`}
          onMouseEnter={() => setButtonText("Comprobar el patrón objetivo")}
          onMouseLeave={() => setButtonText(targetText)}
          onClick={hasWinnerPattern}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
