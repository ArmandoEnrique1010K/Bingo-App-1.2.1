import { boardNumbers } from "../../data/boardNumbers";
import { fisherYatesShuffle } from "./fisherYatesShuffle";


export const getColumnNumbers = (column: number) => {
  const selectedColumn = boardNumbers.find((r) => r.column === column);

  if (!selectedColumn) return []

  const shuffledValues = fisherYatesShuffle([...selectedColumn.values]);

  if (column === 3) {
    shuffledValues[2] = 0;
  }

  return shuffledValues;
}