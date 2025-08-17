import { boardPositions } from "../../data/boardPositions";

// Asigna números a las posiciones del tablero
export const assignNumbersBoard = (
  first: number[],
  second: number[],
  third: number[],
  fourth: number[],
  fifth: number[]
) => {

  const columnNumbers = [...first, ...second, ...third, ...fourth, ...fifth]

  return columnNumbers.map((number, index) => ({ ...boardPositions[index], number }));
}