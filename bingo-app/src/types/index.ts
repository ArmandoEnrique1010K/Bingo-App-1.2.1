export type Board = {
  id: number,
  cells: {
    position: number,
    number: number
  }[]
}

export type Boards = Board[]

export type MarkedCells = {
  id: number,
  cells: {
    position: number,
    number: number
  }[]
}[]

export type BoardNumbers = {
  column: number,
  values: number[]
}[]

export type BoardPositions = {
  position: number,
  number: number,
}[]

export type Pattern = number[]

export type Level = {
  level: number
  color: string
  music: Audio
  boards: number
  targetText: string
  patterns: Pattern[]
  bots: Bot[]
  tip: string
}
export type Winner = 'none' | 'player' | 'bot' | 'end' | ''

export type Bot = {
  name: string
  boards: number
  numberMarkDelay: number
  victoryDelay: number
}

export type Audio = {
  name: string
  volume: number
}

export type Modal = {
  type: string
  subType: string
  title: string
  message: string
  textButton: {
    left: string
    right: string
  }
}

export type BotBoard = {
  id: string,
  cells: {
    position: number,
    number: number
  }[]
}

export type BotBoards = {
  name: string;
  boards: BotBoard[];
}[];

export type BotsWinners = {
  botName: string,
  boardId: string,
  markedCells: BotBoard['cells']
  victoryDelay: number
}[]

export type PowerUp = {
  id: number,
  name: string,
  description: string,
  icon: string,
  details: DetailsPowerUp,
  activateFunction: () => void,
}

export type DetailsPowerUp = {
  type: 'oneTime' | 'continuous'
  active: boolean,
  turnsRemaining: number,
  hasActivated: boolean,
}

export type SwapNumberSelected = {
  id: number,
  number: number,
  position: number
} | null