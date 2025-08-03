// TODO: MEJORAR LA SINTAXIS DE LOS TYPES
export type Board = {
  id: number,
  board: {
    position: number,
    number: number
  }[]
}

export type Boards = Board[]

export type MarkedCells = {
  id: number,
  board: {
    position: number,
    number: number
  }[]
}[]

export type BoardNumbers = {
  row: number,
  values: number[]
}[]

export type BoardPositions = {
  position: number,
  number: number,
}[]

export type Pattern = number[]

export type Level = {
  level: number
  targetText: string
  boards: number
  patterns: Pattern[]
  bots: Bot[]
  color: string
  music: Music
  tip: string
}
export type Winner = 'none' | 'player' | 'bot' | 'end' | ''

export type Bot = {
  name: string
  interval: number
  boards: number
  reactionTime: number
}

export type Music = {
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

export type TargetResult = {
  idBoard: number;
  targets: { number: number; position: number }[];
};

export type BotBoard = {
  id: string,
  board: {
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
  markedCells: BotBoard['board']
  reactionTime: number
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
  hasActivated: boolean,
  active: boolean,
  turnsRemaining: number,
}

export type SwapNumberSelected = {
  id: number, number: number, position: number
} | null