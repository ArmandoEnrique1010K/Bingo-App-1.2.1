import { BoardPositions } from "../../types";
import BotBingoCell from "./BotBingoCell";

type BotBingoColumnProps = {
  idBoard: string;
  board: BoardPositions;
  min: number;
  max: number;
  botName: string;
};

export default function BotBingoColumn({
  idBoard,
  board,
  min,
  max,
  botName,
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
              value={{ number: n.number, position: n.position }}
              botName={botName}
            />
          ))}
      </div>
    </>
  );
}
