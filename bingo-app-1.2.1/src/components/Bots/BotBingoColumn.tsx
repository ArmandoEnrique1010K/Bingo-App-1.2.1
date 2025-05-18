import { BoardPositions } from "../../types";
import BotBingoCell from "./BotBingoCell";

type BotBingoColumnProps = {
  idBoard: string;
  board: BoardPositions;
  min: number;
  max: number;
};

export default function BotBingoColumn({
  idBoard,
  board,
  min,
  max,
}: BotBingoColumnProps) {
  return (
    <>
      <div className="flex flex-col">
        {board
          .filter((n) => n.position >= min && n.position <= max)
          .map((n) => (
            <BotBingoCell
              key={n.position}
              idBoard={idBoard}
              // handleIsSelectedNumber={handleIsSelectedNumber}
              value={{ number: n.number, position: n.position }}
              // color={color}
            />
          ))}
      </div>
    </>
  );
}
