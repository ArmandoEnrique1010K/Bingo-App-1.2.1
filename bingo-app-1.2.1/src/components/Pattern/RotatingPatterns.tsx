import { useEffect, useState } from "react";
import { getPositionsBoard } from "../../utils/Board/getPositionsBoard";
import { useAppStore } from "../../store/useAppStore";
import { CHANGE_PATTERN_DELAY } from "../../constants/defaultConfigs";

export default function RotatingPatterns() {
  const levelData = useAppStore((state) => state.levelData);
  const { color, patterns } = levelData;

  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  const currentPatternPositions = patterns[currentPatternIndex] || [];

  useEffect(() => {
    setCurrentPatternIndex(0); // Reinicia el índice cuando patterns cambia

    if (patterns.length > 1) {
      const interval = setInterval(() => {
        setCurrentPatternIndex(
          (prevIndex) => (prevIndex + 1) % patterns.length
        );
      }, CHANGE_PATTERN_DELAY);

      return () => clearInterval(interval);
    }
  }, [patterns]);

  return (
    <div className="flex flex-row justify-center text-center">
      {getPositionsBoard().map((column, index) => (
        <div key={index + 1} className="flex flex-col">
          {column.map((position) => (
            <div
              key={position}
              className={`sm:size-7 md:size-8 size-7 border-solid border-2 border-gray-700 flex items-center justify-center  ${
                currentPatternPositions.includes(position)
                  ? `bg-${color}-500`
                  : "bg-gray-600"
              }`}
            >
              ·
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
