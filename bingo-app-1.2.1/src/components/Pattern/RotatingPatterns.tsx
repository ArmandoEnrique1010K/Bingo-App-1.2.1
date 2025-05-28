import { useEffect, useRef, useState } from "react";
import { getPositionsBoard } from "../../utils/Board/getPositionsBoard";
import { useAppStore } from "../../store/useAppStore";
import { CHANGE_PATTERN_DELAY } from "../../constants/defaultConfigs";

export default function RotatingPatterns() {
  const levelData = useAppStore((state) => state.levelData);

  const { color, patterns } = levelData;

  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  const intervalRef = useRef<number>(1);

  useEffect(() => {
    if (patterns.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentPatternIndex((prevIndex) => (prevIndex + 1) % patterns.length);
    }, CHANGE_PATTERN_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [patterns]);

  return (
    <div className="flex flex-row justify-center text-center">
      {getPositionsBoard().map((column, index) => (
        <div key={index + 1} className="flex flex-col">
          {column.map((position) => (
            <div
              key={position}
              className={`sm:size-7 md:size-8 size-7 border-solid border-2 border-gray-700 flex items-center justify-center  ${
                patterns[currentPatternIndex]?.includes(position)
                  ? `bg-${color}-500`
                  : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
