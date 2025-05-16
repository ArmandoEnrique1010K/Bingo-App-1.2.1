


export type Board = {
  id: number,
  board: {
    position: number,
    number: number
  }[]
}

export type Boards = Board[]

export type SelectedNumbersAndPositions = {
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
}
export type Winner = 'none' | 'player' | 'bot' | 'end' | ''

export type Bot = {
  name: string
  interval: number
  boards: number
}

export type Music = {
  name: string
  volume: number
}

export type Modal = {
  type: string
  title: string
  message: string
  textButton: {
    left: string
    right: string
  }

}
