import { boardNumbers } from "../../data/boardNumbers";
import { fisherYatesShuffle } from "./fisherYatesShuffle";

export const getColumnNumbers = (row: number) => {
  const selectedRow = boardNumbers.find((r) => r.row === row);

  if (!selectedRow) return []

  const shuffledValues = fisherYatesShuffle([...selectedRow.values]);

  if (row === 3) {
    shuffledValues[2] = 0;
  }

  return shuffledValues;
}