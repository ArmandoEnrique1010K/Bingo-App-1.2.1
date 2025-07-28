import { BoardPositions } from "../../types";
import BotBingoColumn from "./BotBingoColumn";

type BotBingoBoardProps = {
  board: BoardPositions;
  idBoard: string;
  botName: string
};

export default function BotBingoBoard({ board, idBoard, botName }: BotBingoBoardProps) {
  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-row justify-center text-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <BotBingoColumn
              key={index}
              idBoard={idBoard}
              board={board}
              min={index * 5 + 1}
              max={(index + 1) * 5}
              botName={botName}
            />
          ))}
        </div>
        <div>{idBoard}</div>
      </div>
    </>
  );
}
