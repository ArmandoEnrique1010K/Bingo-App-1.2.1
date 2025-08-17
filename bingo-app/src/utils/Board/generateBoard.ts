import { assignNumbersBoard } from "./assignNumbersBoard";
import { getColumnNumbers } from "./getColumnNumbers";

// Genera un tablero para el jugador
export const generateBoard = () => {
  return assignNumbersBoard(
    getColumnNumbers(1),
    getColumnNumbers(2),
    getColumnNumbers(3),
    getColumnNumbers(4),
    getColumnNumbers(5)
  );
};