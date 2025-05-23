

import { FRIENDS, LIVE, SOMEDAY, MOUNTAIN, TAP, DARKNESS, MOONLIGHT, SLOW } from "../constants/audioSettings";
import { Level } from "../types";

export const levels: Level[] = [
  {
    level: 1,
    targetText: "Columna o una fila de 5 números",
    boards: 1,
    patterns: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [5, 10, 15, 20, 25],
    ],
    bots: [
      {
        name: "S-Bot",
        interval: 400,
        boards: 2,
        reactionTime: 5000
      },
      {
        name: "S-Bot-2",
        interval: 400,
        boards: 1,
        reactionTime: 5000
      }
    ],
    color: 'blue',
    music: SLOW
  },
  {
    level: 2,
    targetText: "Cruz de 5 números",
    boards: 1,
    patterns: [
      [6, 2, 7, 12, 8],
      [11, 7, 12, 17, 13],
      [16, 12, 17, 22, 18],

      [7, 3, 8, 13, 9],
      [12, 8, 13, 18, 14],
      [17, 13, 18, 23, 19],

      [8, 4, 9, 14, 10],
      [13, 9, 14, 19, 15],
      [18, 14, 19, 24, 20],
    ],
    bots: [
      {
        name: "S-Bot",
        interval: 1900,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'blue',
    music: TAP
  },
  {
    level: 3,
    targetText: "Rectangulo de 6 números",
    boards: 1,
    patterns: [
      [1, 2, 6, 7, 11, 12],
      [2, 3, 7, 8, 12, 13],
      [3, 4, 8, 9, 13, 14],
      [4, 5, 9, 10, 14, 15],

      [6, 7, 11, 12, 16, 17],
      [7, 8, 12, 13, 17, 18],
      [8, 9, 13, 14, 18, 19],
      [9, 10, 14, 15, 19, 20],

      [11, 12, 16, 17, 21, 22],
      [12, 13, 17, 18, 22, 23],
      [13, 14, 18, 19, 23, 24],
      [14, 15, 19, 20, 24, 25],
    ],
    bots: [
      {
        name: "M-Bot",
        interval: 1400,
        boards: 1,
        reactionTime: 0
      }
    ],
    color: 'blue',
    music: SLOW
  },
  {
    level: 4,
    targetText: "Aspa de 5 números",
    boards: 1,
    patterns: [
      [1, 11, 7, 3, 13],
      [6, 16, 12, 8, 18],
      [11, 21, 17, 13, 23],
      [2, 12, 8, 4, 14],
      [7, 17, 13, 9, 19],
      [12, 22, 18, 14, 24],
      [3, 13, 9, 5, 15],
      [8, 18, 14, 10, 20],
      [13, 23, 19, 15, 25],
    ],
    bots: [
      {
        name: "S-Bot 1",
        interval: 2100,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 2",
        interval: 1700,
        boards: 1,
        reactionTime: 0
      }
    ],
    color: 'blue',
    music: MOONLIGHT
  },
  {
    level: 5,
    targetText: "Simbolo de potencia",
    boards: 1,
    patterns: [
      [3, 7, 11, 17, 23],
      [4, 8, 12, 18, 24],
      [5, 9, 13, 19, 25]
    ],
    bots: [
      {
        name: "S-Bot 1",
        interval: 2100,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 2",
        interval: 1700,
        boards: 1,
        reactionTime: 0
      }
    ],
    color: 'blue',
    music: TAP
  },
  {
    level: 6,
    targetText: "Esquina de 90 grados",
    boards: 1,
    patterns: [
      [
        1, 6, 11, 16, 21,
        2,
        3,
        4,
        5,
      ],
      [
        1, 6, 11, 16, 21,
        22,
        23,
        24,
        25
      ],
      [
        21,
        22,
        23,
        24,
        5, 10, 15, 20, 25
      ],
      [
        1,
        2,
        3,
        4,
        5, 10, 15, 20, 25
      ]
    ],
    // TODO: CAMBIAR LOS BOTS
    bots: [
      {
        name: "F-Bot",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot",
        interval: 1500,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'cyan',
    music: LIVE
  },
  {
    level: 7,
    targetText: "2 cuadrados en 2 esquinas",
    boards: 2,
    patterns: [
      [1, 6, 2, 7, 16, 21, 17, 22],
      [1, 6, 2, 7, 19, 24, 20, 25],
      [4, 9, 5, 10, 16, 21, 17, 22],
      [4, 9, 5, 10, 19, 24, 20, 25],
      [1, 6, 2, 7, 4, 9, 5, 10],
      [16, 21, 17, 22, 19, 24, 20, 25],
    ],
    bots: [
      {
        name: "M-Bot",
        interval: 1500,
        boards: 2,
        reactionTime: 0
      },
    ],
    color: 'cyan',
    music: MOONLIGHT
  },
  {
    level: 8,
    targetText: "Ojo en el centro",
    boards: 1,
    patterns: [
      [
        6, 11, 16,
        2, 22,
        3, 13, 23,
        4, 24,
        10, 15, 20,
      ]
    ],
    bots: [
      {
        name: "M-Bot",
        interval: 1400,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot",
        interval: 1700,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'cyan',
    music: SLOW
  },
  {
    level: 9,
    targetText: "Matriz de 9 números",
    boards: 1,
    patterns: [
      [
        1, 11, 21,
        3, 13, 23,
        5, 15, 25
      ]
    ],
    bots: [
      {
        name: "S-Bot 1",
        interval: 1800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 2",
        interval: 2000,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 3",
        interval: 2200,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 4",
        interval: 1800,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'cyan',
    music: TAP
  },
  {
    level: 10,
    targetText: "Dos filas de 10 números",
    boards: 1,
    patterns: [
      [1, 6, 11, 16, 21, 2, 7, 12, 17, 22],
      [1, 6, 11, 16, 21, 3, 8, 13, 18, 23],
      [1, 6, 11, 16, 21, 4, 9, 14, 19, 24],
      [1, 6, 11, 16, 21, 5, 10, 15, 20, 25],
      [2, 7, 12, 17, 22, 3, 8, 13, 18, 23],
      [2, 7, 12, 17, 22, 4, 9, 14, 19, 24],
      [2, 7, 12, 17, 22, 5, 10, 15, 20, 25],
      [3, 8, 13, 18, 23, 4, 9, 14, 19, 24],
      [3, 8, 13, 18, 23, 5, 10, 15, 20, 25],
      [4, 9, 14, 19, 24, 5, 10, 15, 20, 25],
    ],
    bots: [
      {
        name: "S-Bot 1",
        interval: 2100,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 2",
        interval: 1700,
        boards: 1,
        reactionTime: 0
      }
    ],
    color: 'cyan',
    music: MOONLIGHT
  },
  {
    level: 11,
    targetText: "Aspa de 9 números",
    boards: 2,
    patterns: [
      [
        1, 21,
        7, 17,
        13,
        9, 19,
        5, 25,
      ],
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1500,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot",
        interval: 1800,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1300,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot",
        interval: 900,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'emerald',
    music: MOUNTAIN
  },

  {
    level: 12,
    targetText: "Cuadrado de 16 números",
    boards: 2,
    patterns: [
      [1, 6, 11, 16, 2, 7, 12, 17,
        3, 8, 13, 18, 4, 9, 14, 19],
      [2, 7, 12, 17, 3, 8, 13, 18,
        4, 9, 14, 19, 5, 10, 15, 20],
      [6, 11, 16, 21, 7, 12, 17, 22,
        8, 13, 18, 23, 9, 14, 19, 24],
      [7, 12, 17, 22, 8, 13, 18, 23,
        9, 14, 19, 24, 10, 15, 20, 25],
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1500,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1400,
        boards: 2,
        reactionTime: 0
      }
    ],
    color: 'emerald',
    music: DARKNESS
  },
  {
    level: 13,
    targetText: "Número 1",
    boards: 1,
    patterns: [
      [6, 2, 7, 8, 9, 5, 10, 15],
      [11, 7, 12, 13, 14, 10, 15, 20],
      [16, 12, 17, 18, 19, 15, 20, 25]
    ],
    bots: [
      {
        name: "S-Bot",
        interval: 1900,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot",
        interval: 1400,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot",
        interval: 900,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'emerald',
    music: SLOW
  },
  {
    level: 14,
    targetText: "Circulo de 8 números",
    boards: 1,
    patterns: [
      [1, 6, 11, 2, 12, 3, 8, 13],
      [2, 7, 12, 3, 13, 4, 9, 14],
      [3, 8, 13, 4, 14, 5, 10, 15],
      [6, 11, 16, 7, 17, 8, 13, 18],
      [7, 12, 17, 8, 18, 9, 14, 19],
      [8, 13, 18, 9, 19, 10, 15, 20],
      [11, 12, 13, 16, 18, 21, 22, 23],
      [12, 13, 14, 17, 19, 22, 23, 24],
      [13, 14, 15, 18, 20, 23, 24, 25]
    ],
    bots: [
      {
        name: "S-Bot",
        interval: 1900,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'emerald',
    music: LIVE
  },
  {
    level: 15,
    targetText: "Letras 'H' e 'I'",
    boards: 2,
    patterns: [
      [
        1, 11, 21,
        2, 12, 22,
        3, 8, 13, 23,
        4, 14, 24,
        5, 15, 25,
      ]
    ],

    bots: [
      {
        name: "S-Bot 1",
        interval: 1900,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 1",
        interval: 1400,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 2",
        interval: 1700,
        boards: 2,
        reactionTime: 0
      },
    ],
    color: 'emerald',
    music: FRIENDS
  },
  {
    level: 16,
    targetText: "Señal de transito",
    boards: 2,
    patterns: [
      [
        2, 3, 4,
        7, 8, 9,
        11, 12, 13, 14, 15,
        17, 18, 19,
        23
      ],
      [
        3,
        7, 8, 9,
        11, 12, 13, 14, 15,
        17, 18, 19,
        22, 23, 24
      ],
      [
        3,
        6, 7, 8, 9,
        11, 12, 13, 14, 15,
        16, 17, 18, 19,
        23
      ],
      [
        3,
        7, 8, 9, 10,
        11, 12, 13, 14, 15,
        17, 18, 19, 20,
        23
      ]
    ],

    bots: [
      {
        name: "S-Bot 1",
        interval: 1900,
        boards: 2,
        reactionTime: 0
      },
    ],
    color: 'lime',
    music: TAP
  },

  {
    level: 17,
    targetText: "Un cuadrado de 9 números",
    boards: 1,
    patterns: [
      [
        1, 6, 11,
        2, 7, 12,
        3, 8, 13,
      ],
      [
        6, 11, 16,
        7, 12, 17,
        8, 13, 18,
      ],
      [
        11, 16, 21,
        12, 17, 22,
        13, 18, 23,
      ],
      [
        2, 7, 12,
        3, 8, 13,
        4, 9, 14,
      ],
      [
        7, 12, 17,
        8, 13, 18,
        9, 14, 19,
      ],
      [
        12, 17, 22,
        13, 18, 23,
        14, 19, 24,
      ],
      [
        3, 8, 13,
        4, 9, 14,
        5, 10, 15,
      ],
      [
        8, 13, 18,
        9, 14, 19,
        10, 15, 20,
      ],
      [
        13, 18, 23,
        14, 19, 24,
        15, 20, 25,
      ],
    ],
    bots: [
      {
        name: "F-Bot 1",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1400,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot",
        interval: 2000,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "M-Bot 1",
        interval: 1500,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 2",
        interval: 900,
        boards: 1,
        reactionTime: 0
      }
    ],
    color: 'lime',
    music: MOONLIGHT
  },
  {
    level: 18,
    targetText: "Piramide simetrica de 8 números",
    boards: 1,
    patterns: [
      [
        13,
        9, 14, 19,
        5, 10, 15, 20, 25,
      ],
      [
        1, 6, 11, 16, 21,
        7, 12, 17,
        13,
      ],
      [
        1,
        2, 7,
        3, 8, 13,
        4, 9,
        5,
      ],
      [
        21,
        17, 22,
        13, 18, 23,
        19, 24,
        25,
      ],
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "F-Bot",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1500,
        boards: 2,
        reactionTime: 0
      },
    ],
    color: 'lime',
    music: MOUNTAIN
  },
  {
    level: 19,
    targetText: "Letra 'Z' o letra 'N'",
    boards: 1,
    patterns: [
      [1, 6, 11, 16, 21, 17, 13, 9, 5, 10, 15, 20, 25],
      [1, 2, 3, 4, 5, 7, 13, 19, 25, 21, 22, 23, 24]

    ],
    bots: [
      {
        name: "F-Bot 1",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'lime',
    music: LIVE
  },
  {
    level: 20,
    targetText: "Aspa invertida",
    boards: 2,
    patterns: [
      [
        6, 11, 16,
        2, 12, 22,
        3, 8, 18, 23,
        4, 14, 24,
        10, 15, 20
      ]
    ],
    bots: [
      {
        name: "S-Bot",
        interval: 2000,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 1",
        interval: 1500,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1300,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "F-Bot",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'lime',
    music: DARKNESS
  },
  {
    level: 21,
    targetText: "3 filas o 3 columnas separadas",
    boards: 2,
    patterns: [
      [
        1, 6, 11, 16, 21,
        3, 8, 13, 18, 23,
        5, 10, 15, 20, 25,
      ],
      [
        1, 11, 21,
        2, 12, 22,
        3, 13, 23,
        4, 14, 24,
        5, 15, 25,
      ],
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1500,
        boards: 3,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1300,
        boards: 3,
        reactionTime: 0
      },
    ],
    color: 'amber',
    music: SLOW
  },
  {
    level: 22,
    targetText: "Diamante invertido",
    boards: 2,
    patterns: [
      [
        1, 6, 16, 21,
        2, 12, 22,
        8, 13, 18,
        4, 14, 24,
        5, 10, 20, 25,
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot",
        interval: 1800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1500,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 3",
        interval: 1300,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 1",
        interval: 700,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 2",
        interval: 600,
        boards: 1,
        reactionTime: 0
      }
    ],
    color: 'amber',
    music: FRIENDS
  },

  {
    level: 23,
    targetText: "Simbolo de porcentaje",
    boards: 2,
    patterns: [
      [
        1, 2, 6, 7,
        5, 9, 13, 17, 21,
        19, 20, 24, 25
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'amber',
    music: TAP
  },

  {
    level: 24,
    targetText: "Número 4",
    boards: 2,
    patterns: [
      [
        11, 16,
        7, 17,
        3, 8, 13, 18, 23,
        19,
        20
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'amber',
    music: LIVE
  },
  {
    level: 25,
    targetText: "Asterisco",
    boards: 1,
    patterns: [
      [
        1, 11, 21,
        7, 12, 17,
        3, 8, 13, 18, 23,
        9, 14, 19,
        5, 15, 25
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'amber',
    music: SOMEDAY
  },
  {
    level: 26,
    targetText: "La parca",
    boards: 1,
    patterns: [
      [
        1, 6, 11, 16, 21,
        2, 12, 22,
        3, 8, 13, 18, 23,
        9, 19,
        10, 20
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'red',
    music: FRIENDS
  },
  {
    level: 27,
    targetText: "Diseño de mosaico",
    boards: 1,
    patterns: [
      [
        1, 11, 21,
        7, 17,
        3, 13, 23,
        9, 19,
        5, 15, 25
      ],
      [
        6, 16,
        2, 12, 22,
        8, 18,
        4, 14, 24,
        10, 20
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'red',
    music: MOONLIGHT
  },

  {
    level: 28,
    targetText: "Patrón irregular",
    boards: 2,
    patterns: [
      [
        4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
        3, 8, 18, 23, 2
      ],

      [
        4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
        3, 8, 13, 23, 7
      ],
      [
        4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
        3, 8, 13, 18, 12
      ],
      [
        4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
        3, 8, 18, 22, 23
      ],
      [
        4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
        3, 13, 18, 17, 23
      ],
      [
        4, 5, 9, 10, 14, 15, 19, 20, 24, 25,
        8, 13, 18, 12, 23
      ],
    ],
    bots: [
      // MODIFICAR ESTO
      {
        name: "M-Bot 1",
        interval: 1500,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 3",
        interval: 1500,
        boards: 3,
        reactionTime: 0
      },
      {
        name: "F-Bot",
        interval: 900,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1300,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'red',
    music: MOUNTAIN
  },
  {
    level: 29,
    targetText: "Una escalera de 15 números",
    boards: 2,
    patterns: [
      [
        1, 6, 11, 16, 21,
        2, 7, 12, 17,
        3, 8, 13,
        4, 9,
        5,
      ],
      [
        21,
        17, 22,
        13, 18, 23,
        9, 14, 19, 24,
        5, 10, 15, 20, 25,
      ],
      [
        1, 6, 11, 16, 21,
        7, 12, 17, 22,
        13, 18, 23,
        19, 24,
        25,
      ],
      [
        1,
        2, 7,
        3, 8, 13,
        4, 9, 14, 19,
        5, 10, 15, 20, 25,
      ],
    ],
    bots: [
      {
        name: "F-Bot 1",
        interval: 900,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 2",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 1",
        interval: 1400,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1300,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'red',
    music: SOMEDAY
  },
  {
    level: 30,
    targetText: "Marca todo el tablero",
    boards: 2,
    patterns: [
      [
        1, 6, 11, 16, 21,
        2, 7, 12, 17, 22,
        3, 8, 13, 18, 23,
        4, 9, 14, 19, 24,
        5, 10, 15, 20, 25,
      ]
    ],
    bots: [
      {
        name: "M-Bot 1",
        interval: 1200,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "S-Bot 1",
        interval: 1800,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 1",
        interval: 700,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "M-Bot 2",
        interval: 1500,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "M-Bot 3",
        interval: 1300,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 2",
        interval: 600,
        boards: 2,
        reactionTime: 0
      },
      {
        name: "S-Bot 2",
        interval: 2000,
        boards: 1,
        reactionTime: 0
      },
      {
        name: "F-Bot 3",
        interval: 800,
        boards: 1,
        reactionTime: 0
      },
    ],
    color: 'red',
    music: DARKNESS
  },
]