import { MAX_TURNS } from "../../constants/defaultConfigs";
import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "../Bots/BotBingoBoard";

type DefeatMessageProps = {
  message: string;
};

export default function DefeatMessage({ message }: DefeatMessageProps) {
  const levelData = useAppStore((state) => state.levelData);
  const checkWinnerPatternBot = useAppStore(
    (state) => state.checkWinnerPatternBot
  );
  const botBoards = useAppStore((state) => state.botBoards);

  const firstBotWinnerData = checkWinnerPatternBot()[0] || [];
  const currentRound = useAppStore((state) => state.currentRound);

  return (
    <>
      <p className="text-center">{message}</p>

      {currentRound !== MAX_TURNS && (
        <p>
          El bot {firstBotWinnerData.botName} tiene en su tablero con el id{" "}
          {firstBotWinnerData.boardId} el patrón ganador: "
          <span className="font-bold">{levelData.targetText}</span>"
        </p>
      )}
      <BotBingoBoard
        board={
          botBoards
            ?.find((bot) => bot.name === checkWinnerPatternBot()[0]?.botName) // Encuentra el bot correspondiente
            ?.boards.find(
              (boardObj) => boardObj.id === checkWinnerPatternBot()[0]?.boardId
            )?.board || []
        }
        idBoard={checkWinnerPatternBot()[0]?.boardId || ""}
      />
    </>
  );
}
