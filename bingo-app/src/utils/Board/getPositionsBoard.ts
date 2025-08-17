const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

export const getPositionsBoard = () => {
  const rows: number[][] = [];

  for (let i = 0; i < numbers.length; i += 5) {
    rows.push(numbers.slice(i, i + 5));
  }

  return rows;
}