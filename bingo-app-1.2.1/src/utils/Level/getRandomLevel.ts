import { levels } from "../../data/levels";

// Obtener un nivel aleatorio
export function getRandomLevel(levelNumbers: number[]) {
  if (!levelNumbers.length) {
    throw new Error("No level numbers provided");
  }
  const randomIndex = Math.floor(Math.random() * levelNumbers.length);
  const levelNumber = levelNumbers[randomIndex];
  const level = levels.find(l => l.level === levelNumber);
  if (!level) {
    throw new Error(`Level ${levelNumber} not found`);
  }
  const { targetText, boards, patterns } = level;
  return { targetText, boards, patterns };
}
