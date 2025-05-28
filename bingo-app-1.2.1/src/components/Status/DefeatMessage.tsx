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

  const firstWinnerBotData = checkWinnerPatternBot()[0] || [];
  const currentRound = useAppStore((state) => state.currentRound);
  const botName = firstWinnerBotData?.botName || "Desconocido";
  const boardId = firstWinnerBotData?.boardId || "N/A";

  const winningBoard =
    botBoards
      ?.find((bot) => bot.name === botName)
      ?.boards.find((boardObj) => boardObj.id === boardId)?.board || [];

  return (
    <>
      <p className="text-center">{message}</p>

      {currentRound !== MAX_TURNS && (
        <p>
          El bot "<span className="font-bold">{botName}</span>" tiene en su
          tablero con el id "<span className="font-bold">{boardId}</span>" el
          patrón ganador "
          <span className="font-bold">{levelData.targetText}</span>".
        </p>
      )}
      <BotBingoBoard board={winningBoard} idBoard={boardId} />
    </>
  );
}
