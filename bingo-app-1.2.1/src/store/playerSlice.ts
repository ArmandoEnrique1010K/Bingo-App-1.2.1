import { StateCreator } from "zustand";
import { GameSliceType, } from './gameSlice';
import { LevelSliceType } from "./levelSlice";
import { Board, Boards, MarkedCells } from "../types";
import { AudioSliceType } from "./audioSlice";
import { FINAL_LEVEL_VICTORY_MODAL, ILEGAL_MODAL, VICTORY_MODAL } from "../constants/statusModalsText";
import { FINAL_LEVEL } from "../constants/defaultConfigs";
import { CORRECT_SOUND, VICTORY_SOUND, DARKNESS_SOLO, WRONG_SOUND, DEFEAT_SOUND, ANYMORE_ENDING } from "../constants/audioSettings";
import { BotSliceType } from "./botSlice";
import { PowerUpSliceType } from "./powerUpSlice";

export type PlayerSliceType = {
  playerBoards: Boards,
  markedCells: MarkedCells,
  currentBoard: Board,
  setCurrentBoard: (id: number) => void,
  hasWinnerPattern: () => boolean,
  isCellMarked: (idBoard: number, position: number) => boolean,
  selectCell: (idBoard: number, number: number, position: number) => void
  hasKillAllBot: () => void,
}

export const playerSlice: StateCreator<PlayerSliceType & GameSliceType & LevelSliceType & AudioSliceType & BotSliceType & PowerUpSliceType, [], [], PlayerSliceType> = (set, get) => ({
  playerBoards: [],
  markedCells: [],
  currentBoard: { id: 0, board: [] },

  setCurrentBoard: (id: number) => {
    set({
      currentBoard: get().playerBoards.find(b => b.id === id)
    })
  },

  hasWinnerPattern: () => {
    for (const b of get().markedCells) {
      if (get().levelData.patterns.some((p: number[]) => p.every(n => b.board.some(e => e.position === n)))) {
        set({
          currentTargets: [],
          winner: 'player',
          gameEnded: true,
          modal: get().levelData.level !== FINAL_LEVEL ? VICTORY_MODAL : FINAL_LEVEL_VICTORY_MODAL,
          isStatusModalOpen: true,
        })

        if (get().levelData.level !== FINAL_LEVEL) {
          get().unlockLevel(get().levelData.level + 1)
        }

        // DESBLOQUEAR UN POWERUP
        // Completa el nivel 2 para desbloquear el powerup del id 1
        // Completa el nivel 5 para desbloquear el powerup del id 2
        // Completa el nivel 8 para desbloquear el powerup del id 3
        // Completa el nivel 11 para desbloquear el powerup del id 4
        // Completa el nivel 14 para desbloquear el powerup del id 5

        // Si el nivel completado es multiplo de 3 menos 1, desbloquea el powerup
        const completedLevel = get().levelData.level;
        const powerUpId = Math.floor(completedLevel / 3) + 1;

        if (completedLevel % 3 === 2) {
          get().unlockPowerUp(powerUpId)
          console.log("Se ha desbloqueado el powerup con el id: ", powerUpId)
        }

        get().resetBotTimeouts()

        get().playSound(VICTORY_SOUND)
        get().changeMusic(DARKNESS_SOLO)

        return true
      } else {
        get().playSound(WRONG_SOUND)

      }
    }

    return false;
  },

  isCellMarked: (idBoard: number, position: number) => {
    return get().markedCells.some(
      (b) => b.id === idBoard && b.board.some((e) => e.position === position)
    );
  },

  selectCell: (idBoard, number, position) => {
    if (get().currentTargets.includes(number) &&
      !get().isCellMarked(idBoard, position)
    ) {
      set({
        markedCells: get().markedCells.map(b => {
          if (b.id === idBoard) {
            return {
              ...b,
              board: [
                ...b.board,
                {
                  position,
                  number,
                }
              ]
            }
          }
          return b
        })
      });

      get().playSound(CORRECT_SOUND)

      // TODO: ZONA DEL POWERUP NUMERO ALEATORIO

      // Si ninguno de los numeros objetivos encontrados coincide con el numero con el que el usuario hizo clic, se considera
      // como un numero aleatorio objetivo y se marca

    } else {
      get().playSound(WRONG_SOUND)

      // El numero 100 indica que el numero aleatorio (el icono de una estrella)
      if (get().currentTargets.includes(100) && get().currentTargets.map(t => t === 100).includes(true) &&
        !get().playerHasMarkedRandomNumberObjective && !get().isCellMarked(idBoard, position)) {
        // console.log(get().currentTargets)
        get().selectRandomNumberObjectiveOnBoard(idBoard, number, position)
      }

    }
  },

  // Si el jugador ha hecho trampa eliminando a todos los bots con el powerup con id 10 (remove bot)
  hasKillAllBot: () => {
    set({
      currentTargets: [],
      winner: 'end',
      gameEnded: true,
      modal: ILEGAL_MODAL,
      isStatusModalOpen: true,
    })

    get().playSound(DEFEAT_SOUND)
    get().changeMusic(ANYMORE_ENDING)
  }
});