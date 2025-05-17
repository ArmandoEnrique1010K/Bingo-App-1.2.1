import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "./BotBingoBoard";

type BotOpponentProps = {
  // interval: number;
  name: string;
  boards: number;
  nextBoards: number;
  botIndex: number;
};
export default function BotOpponent({
  // interval,
  name,
  boards,
  nextBoards,
  botIndex,
}: BotOpponentProps) {
  const botBoards = useAppStore((state) => state.botBoards);

  return (
    <div
      className={`flex flex-col items-center bg-gray-700 p-2 rounded-lg shadow-md  ${
        boards >= 2 ? "col-span-2" : ""
      } ${
        boards < 2 && (nextBoards !== 0 || nextBoards >= 2) ? "col-span-2" : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>
      <div className="flex flex-row gap-4">
        {Array.from({ length: boards }).map((_, boardIndex) => (
          <BotBingoBoard
            key={boardIndex + 1}
            // board={botBoards.find((b) => b.)?.board || []}
            // board={botBoards.

            //   find((b) =>
            //   b.map((m) => m.id === `Bot-${botIndex}-${boardIndex}`)

            //   // ¿PORQUE NO PUEDO RETORNAR m.board
            // )}

            board={
              botBoards
                .find((bot) => bot.name === name) // Encuentra el bot correspondiente
                ?.boards.find(
                  (boardObj) => boardObj.id === `Bot-${botIndex}-${boardIndex}`
                )?.board || []
            }
            idBoard={boardIndex + 1}
            // interval={interval}

            //  `Bot-${botIndex}-${boardIndex}`
          />
        ))}

        {/* {Array.from({ length: boards }).map((board, boardIndex) => (
          <BotBingoBoard
            key={boardIndex + 1}
            board={botBoards.find(b => b.id)?.board || []}
            idBoard={index + 1}
            // interval={interval}

            //  `Bot-${botIndex}-${boardIndex}`
          />
        ))} */}

        {/* {botBoards
          .find((bot) => bot.map(b => b.id === `Bot-${a}-${}`)) // Encuentra el bot correcto
          ?.boards.map((boardObj, boardIndex) => (
            <BotBingoBoard
              key={boardObj.id}
              board={boardObj.board || []} // Pasa el tablero correcto
              idBoard={boardObj.id}
              // interval={interval}
            />
          ))} */}
      </div>
    </div>
  );
}
