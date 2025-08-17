import { MAX_TURNS } from "../../constants/defaultConfigs";
import { useAppStore } from "../../store/useAppStore";
import BotBingoBoard from "../Bots/BotBingoBoard";

type DefeatMessageProps = {
  message: string;
};

export default function DefeatMessage({ message }: DefeatMessageProps) {
  const levelData = useAppStore((state) => state.levelData);
  const listOfBotsWinners = useAppStore((state) => state.listOfBotsWinners);

  const botBoards = useAppStore((state) => state.botBoards);
  const currentRound = useAppStore((state) => state.currentRound);

  const firstWinnerBotData = listOfBotsWinners[0] || [];
  const botName = firstWinnerBotData?.botName || "{bot_name}";
  const boardId = firstWinnerBotData?.boardId || "{board_id}";

  const winningBoard =
    botBoards
      ?.find((bot) => bot.name === botName)
      ?.boards.find((boardObj) => boardObj.id === boardId)?.cells || [];

  return (
    <>
      {currentRound !== MAX_TURNS && (
        <p>
          El bot "<span className="font-bold">{botName}</span>" tiene en su
          tablero con el id "<span className="font-bold">{boardId}</span>" el
          patrón ganador "
          <span className="font-bold">{levelData.targetText}</span>".
        </p>
      )}
      <BotBingoBoard board={winningBoard} idBoard={boardId} />

      <p className="text-center">{message}</p>
    </>
  );
}
