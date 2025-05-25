


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
  reactionTime: number
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


export type TargetResult = {
  idBoard: number;
  targets: { number: number; position: number }[];
};



// TYPES RELACIONADOS A LOS BOTS
export type BotBoard = {
  id: string,
  board: {
    position: number,
    number: number
  }[]
}

// export type BotBoards = BotBoard[]
export type BotBoards = {
  name: string; // Nombre del bot
  boards: BotBoard[]; // Lista de tableros del bot
}[];


// DEBE SER EL TYPE BOTBOARDS
// export type BotSelectedNumbersAndPositions = {
//   id: string,
//   board: {
//     position: number,
//     number: number
//   }[]
// }[]


// ESTO NO DEBERIA EXISTIR, DEBE SER EL MISMO TYPE BOTBOARDS
// export type FindedCells = {
//   id: string,
//   targets: {
//     position: number,
//     number: number
//   }[]
// }[]


