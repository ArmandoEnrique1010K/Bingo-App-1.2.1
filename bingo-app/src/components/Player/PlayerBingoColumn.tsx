import PlayerBingoCell from "./PlayerBingoCell";

type PlayerColumnProps = {
  numberBoard: { position: number; number: number }[];
  boardId: number;
};

export default function PlayerBingoColumn({
  boardId,
  numberBoard,
}: PlayerColumnProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {numberBoard
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
