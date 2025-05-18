import { BoardPositions } from "../../types";
import BotBingoColumn from "./BotBingoColumn";

type BotBingoBoardProps = {
  board: BoardPositions;
  idBoard: string;
  // interval: number;
};

export default function BotBingoBoard({
  board,
  idBoard,
}: // interval,
BotBingoBoardProps) {
  return (
    <>
      <div>{idBoard}</div>
      <div className="grid grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <BotBingoColumn
            key={index}
            idBoard={idBoard}
            board={board}
            // handleIsSelectedNumber={handleIsSelectedNumber}
            min={index * 5 + 1}
            max={(index + 1) * 5}
            // color={color}
          />
        ))}
      </div>
    </>
  );
}
