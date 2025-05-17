import PlayerBingoCell from "./PlayerBingoCell";

type PlayerColumnProps = {
  numberBoard: { position: number; number: number }[];
  // min: number;
  // max: number;
  boardId: number;
};

export default function PlayerBingoColumn({
  // max,
  // min,
  boardId,
  numberBoard,
}: PlayerColumnProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {numberBoard
          // .filter((n) => n.position >= min && n.position <= max)
          .map((n) => (
            <PlayerBingoCell
              key={n.position}
              cellData={{ number: n.number, position: n.position }}
              boardId={boardId}
            />
          ))}
      </div>
    </>
  );
}
