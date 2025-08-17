import { FRIENDS, LIVE, MOUNTAIN, TAP, DARKNESS, MOONLIGHT, SLOW, ANYMORE, SELFLESS } from "../constants/audioSettings";
import { Level } from "../types";
import { generateBotName } from "../utils/Bot/generateBotName";


// Lista de niveles, cada nivel tiene un objetivo, un tablero, un patron objetivo y una lista de bots
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
        name: generateBotName(2200, 1),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 6000
      },
    ],
    color: 'blue',
    music: SLOW,
    tip: "Completa los niveles 2, 5, 8 y asi sucesivamente para desbloquear un nuevo PowerUp."
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
        name: generateBotName(1900, 1),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 6000
      },
    ],
    color: 'blue',
    music: TAP,
    tip: "Puedes aumentar los números objetivo generados a 5 durante 3 turnos con el PowerUp `Números objetivo extra`"
  },
  {
    level: 3,
    targetText: "Rectangulo de 3 x 2 números",
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
        name: generateBotName(1600, 1),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 6000
      }
    ],
    color: 'blue',
    music: SLOW,
    tip: "Si pudistes derrotar a un Bot, ¿Podras derrotar a 2 Bots?"
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
        name: generateBotName(2200, 1),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 6000
      },
      {
        name: generateBotName(2200, 2),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 6000
      }
    ],
    color: 'blue',
    music: MOONLIGHT,
    tip: "Algunos niveles tienen un número reducido de combinaciones de patrones objetivos"
  },
  {
    level: 5,
    targetText: "Rectangulo de 2 x 4 números",
    boards: 1,
    patterns: [
      [1, 2, 3, 4, 6, 7, 8, 9],
      [6, 7, 8, 9, 11, 12, 13, 14],
      [11, 12, 13, 14, 16, 17, 18, 19],
      [16, 17, 18, 19, 21, 22, 23, 24],
      [2, 3, 4, 5, 7, 8, 9, 10],
      [7, 8, 9, 10, 12, 13, 14, 15],
      [12, 13, 14, 15, 17, 18, 19, 20],
      [17, 18, 19, 20, 22, 23, 24, 25],
    ],
    bots: [
      {
        name: generateBotName(1900, 1),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 6000
      },
      {
        name: generateBotName(2200, 2),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 6000
      }
    ],
    color: 'blue',
    music: TAP,
    // tip: "Si te hace falta marcar un número del tablero, puedes intercambiar 2 números de tu tablero con el PowerUp `Intercambiar posiciones`"
    tip: "Al activar el powerup `Forzar un patrón de cruz`, selecciona un número no marcado de tu tablero para que el siguiente número objetivo sea uno de los números que aparecen tanto en la misma fila como en la misma columna"
  },
  {
    level: 6,
    targetText: "Simbolo de potencia",
    boards: 1,
    patterns: [
      [3, 7, 11, 17, 23],
      [4, 8, 12, 18, 24],
      [5, 9, 13, 19, 25]
    ],
    bots: [
      {
        name: generateBotName(1600, 1),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 5500
      },
    ],
    color: 'cyan',
    music: SELFLESS,
    tip: "En algunos niveles se te puede asignar 2 tableros de Bingo, el objetivo es formar el patrón objetivo en uno de los tableros"
    // tip: "Algunos niveles pueden tener un número reducido de las posibles combinaciones del patrón objetivo, asimismo puede tener 1 solo patrón objetivo"
    // tip: "Ten en cuenta que si aumentas los numeros objetivos generados, los bots tambien tendrán más números que marcar"
  },
  // {
  //   level: 6,
  //   targetText: "Simbolo de exclamación",
  //   boards: 1,
  //   patterns: [
  //     [1, 2, 3, 5],
  //     [6, 7, 8, 10],
  //     [11, 12, 13, 15],
  //     [16, 17, 18, 20],
  //     [21, 22, 23, 25],
  //     [1, 3, 4, 5],
  //     [6, 8, 9, 10],
  //     [11, 13, 14, 15],
  //     [16, 18, 19, 20],
  //     [21, 23, 24, 25],
  //   ],
  //   bots: [
  //     {
  //       name: generateBotName(1300, 1),
  //       numberMarkDelay: 1300,
  //       boards: 1,
  //       victoryDelay: 5500
  //     },
  //   ],
  //   color: 'cyan',
  //   music: SELFLESS,
  // },

  {
    level: 7,
    targetText: "Los bordes sin esquinas",
    boards: 2,
    patterns: [
      [
        6, 11, 16,
        2, 22,
        3, 23,
        4, 24,
        10, 15, 20,
      ]
    ],
    bots: [
      {
        name: generateBotName(2200, 1),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 5500
      },
      {
        name: generateBotName(1900, 2),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 5500
      }
    ],
    color: 'cyan',
    music: SLOW,
    tip: "Un bot también puede tener 2 tableros, recuerda que el ganador es el primero en formar el patrón objetivo en uno de sus tableros"
  },
  {
    level: 8,
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
        name: generateBotName(1900, 1),
        numberMarkDelay: 1900,
        boards: 2,
        victoryDelay: 5500
      },
    ],
    color: 'cyan',
    music: MOONLIGHT,
    // tip: "Por alguna extraña razón, al comparar los números de los 2 tableros, ¡pueden haber números en la misma posición!"
    tip: "Para evitar que un bot se declare ganador, puedes desmarcar un número marcado de su tablero activando el powerup `Desmarcar un número de un bot`"
  },
  {
    level: 9,
    targetText: "Matriz de 9 números",
    boards: 2,
    patterns: [
      [
        1, 11, 21,
        3, 13, 23,
        5, 15, 25
      ]
    ],
    bots: [
      {
        name: generateBotName(2200, 1),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 5500
      },
      {
        name: generateBotName(2500, 2),
        numberMarkDelay: 2500,
        boards: 1,
        victoryDelay: 5500
      },
      {
        name: generateBotName(1900, 3),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 5500
      },
      {
        name: generateBotName(2500, 4),
        numberMarkDelay: 2500,
        boards: 1,
        victoryDelay: 5500
      },
    ],
    color: 'cyan',
    music: TAP,
    tip: ""
  },

  {
    level: 10,
    targetText: "Dos filas de 10 números",
    boards: 1,
    patterns: [
      [1, 6, 11, 16, 21, 2, 7, 12, 17, 22],
      [2, 7, 12, 17, 22, 3, 8, 13, 18, 23],


      [3, 8, 13, 18, 23, 4, 9, 14, 19, 24],
      [4, 9, 14, 19, 24, 5, 10, 15, 20, 25],

      [1, 6, 11, 16, 21, 3, 8, 13, 18, 23],
      [2, 7, 12, 17, 22, 4, 9, 14, 19, 24],
      [3, 8, 13, 18, 23, 5, 10, 15, 20, 25],

      [1, 6, 11, 16, 21, 4, 9, 14, 19, 24],
      [1, 6, 11, 16, 21, 5, 10, 15, 20, 25],
      [2, 7, 12, 17, 22, 5, 10, 15, 20, 25],
    ],
    bots: [
      {
        name: generateBotName(1600, 1),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 5500
      },
      {
        name: generateBotName(1900, 2),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 5500
      }
    ],
    color: 'cyan',
    music: SELFLESS,
    tip: ""
  },
  {
    level: 11,
    targetText: "Número 1",
    boards: 1,
    patterns: [
      [6, 2, 7, 8, 9, 5, 10, 15],
      [11, 7, 12, 13, 14, 10, 15, 20],
      [16, 12, 17, 18, 19, 15, 20, 25]
    ],
    bots: [
      {
        name: generateBotName(1000, 1),
        numberMarkDelay: 1000,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 5000
      },
    ],
    color: 'emerald',
    music: MOUNTAIN,
    tip: "A partir de ahora, tu podras elegir tus powerups antes de empezar un nivel, ¿lograras desbloquear todos los powerups del juego como el powerup `Ralentizar bots`?"
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
        name: generateBotName(1600, 1),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1900, 2),
        numberMarkDelay: 1900,
        boards: 2,
        victoryDelay: 5000
      }
    ],
    color: 'emerald',
    music: MOONLIGHT,
    tip: ""
  },
  {
    level: 13,
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
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1900, 2),
        numberMarkDelay: 1900,
        boards: 2,
        victoryDelay: 5000
      },
      {
        name: generateBotName(2500, 3),
        numberMarkDelay: 2500,
        boards: 1,
        victoryDelay: 5000
      },
    ],
    color: 'emerald',
    music: SLOW,
    tip: ""
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
        name: generateBotName(2200, 1),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1900, 3),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1600, 4),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 5000
      },
    ],
    color: 'emerald',
    music: MOUNTAIN,
    tip: "Si te hace falta marcar un número del tablero, puedes intercambiar 2 números (uno marcado y otro no marcado) de tu tablero con el PowerUp `Intercambiar posiciones`"
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
        name: generateBotName(2200, 1),
        numberMarkDelay: 2200,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1300, 2),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(2500, 3),
        numberMarkDelay: 2500,
        boards: 1,
        victoryDelay: 5000
      },
      {
        name: generateBotName(1600, 4),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 5000
      },
    ],
    color: 'emerald',
    music: FRIENDS,
    tip: ""
  },


  {
    level: 16,
    targetText: "Flecha undireccional",
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
        name: generateBotName(1600, 1),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1300, 2),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
    ],
    color: 'lime',
    music: LIVE,
    tip: ""
  },
  {
    level: 17,
    targetText: "Cuadrado de 9 números",
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
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1900, 3),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1000, 4),
        numberMarkDelay: 1000,
        boards: 1,
        victoryDelay: 4500
      },
    ],
    color: 'lime',
    music: SELFLESS,
    tip: "Si 'X' es un número objetivo que se encuentra en tu tablero, puedes utilizar el powerup `Marcar numeros vecinos` para marcar los números de la forma 'X-2', 'X-1', 'X+1' y 'X+2'"
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
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1300, 3),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
    ],
    color: 'lime',
    music: MOUNTAIN,
    tip: ""
  },
  {
    level: 19,
    targetText: "Letra 'Z' o letra 'N'",
    boards: 2,
    patterns: [
      [1, 6, 11, 16, 21, 17, 13, 9, 5, 10, 15, 20, 25],
      [1, 2, 3, 4, 5, 7, 13, 19, 25, 21, 22, 23, 24]
    ],
    bots: [
      {
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1000, 2),
        numberMarkDelay: 1000,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1300, 3),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
    ],
    color: 'lime',
    music: FRIENDS,
    tip: ""
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
        name: generateBotName(1900, 1),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1300, 3),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1000, 4),
        numberMarkDelay: 1000,
        boards: 1,
        victoryDelay: 4500
      },
      {
        name: generateBotName(1000, 5),
        numberMarkDelay: 1000,
        boards: 1,
        victoryDelay: 4500
      },
    ],
    color: 'lime',
    music: LIVE,
    tip: "Automatiza el marcado de números de tu tablero durante 5 turnos con el powerup `Automarcar un tablero`"
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
        name: generateBotName(1600, 1),
        numberMarkDelay: 1600,
        boards: 3,
        victoryDelay: 4000
      },
      {
        name: generateBotName(1300, 2),
        numberMarkDelay: 1300,
        boards: 3,
        victoryDelay: 4000
      },
    ],
    color: 'amber',
    music: DARKNESS,
    tip: ""
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
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1900, 2),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1600, 3),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1300, 4),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1000, 5),
        numberMarkDelay: 1000,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(2100, 6),
        numberMarkDelay: 2100,
        boards: 1,
        victoryDelay: 3500
      },
    ],
    color: 'amber',
    music: TAP,
    // tip: "Una varita magica es el objeto más poderoso que hay en el juego, podrias usarla para marcar los números vecinos"
    tip: ""
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
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1300, 2),
        numberMarkDelay: 1300,
        boards: 3,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1300, 3),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1300, 4),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3500
      },
    ],
    color: 'amber',
    music: FRIENDS,
    // tip: "Puedes automatizar el marcado de los números de uno de tus tableros con un simple powerup"
    // tip: "Una varita magica es el objeto más poderoso que hay en el juego, podrias usarla para marcar los números vecinos"
    tip: "¿Qué estrategia utilizarias si tu pudieras ver los números de los tableros de los bots durante 5 turnos con el powerup `Clarividencia`?"
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
        name: generateBotName(700, 1),
        numberMarkDelay: 700,
        boards: 2,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1000, 2),
        numberMarkDelay: 1000,
        boards: 2,
        victoryDelay: 3500
      },
      {
        name: generateBotName(700, 3),
        numberMarkDelay: 700,
        boards: 2,
        victoryDelay: 3500
      },
    ],
    color: 'amber',
    music: LIVE,
    tip: ""
  },
  {
    level: 25,
    targetText: "Asterisco",
    boards: 2,
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
        name: generateBotName(700, 1),
        numberMarkDelay: 700,
        boards: 2,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1300, 2),
        numberMarkDelay: 1300,
        boards: 3,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1600, 3),
        numberMarkDelay: 1600,
        boards: 1,
        victoryDelay: 3500
      },
      {
        name: generateBotName(700, 4),
        numberMarkDelay: 700,
        boards: 1,
        victoryDelay: 3500
      },
    ],
    color: 'amber',
    music: DARKNESS,
    tip: "Tu nunca podras llegar al final, a partir de ahora dispones de 2 tableros y los bots tienen más posibilidades de ganar"
  },
  {
    level: 26,
    targetText: "La parca",
    boards: 2,
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
        name: generateBotName(1900, 1),
        numberMarkDelay: 1900,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1300, 3),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1000, 4),
        numberMarkDelay: 1000,
        boards: 2,
        victoryDelay: 3000
      },
    ],
    color: 'red',
    music: ANYMORE,
    tip: "Invoca el número objetivo estrella con el powerup `Número aleatorio objetivo`, ¡todos podrán marcar inmediatamente un único número que no sea un número objetivo de su tablero!"
  },
  {
    level: 27,
    targetText: "Diseño de mosaico",
    boards: 2,
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
        name: generateBotName(1000, 1),
        numberMarkDelay: 1000,
        boards: 3,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 3,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1000, 3),
        numberMarkDelay: 1000,
        boards: 3,
        victoryDelay: 3000
      },
    ],
    color: 'red',
    music: MOONLIGHT,
    tip: ""
  },

  {
    level: 28,
    targetText: "El Yin y el Yang",
    boards: 2,
    patterns: [
      [
        11, 21,
        22,
        8, 13, 18, 23,
        9, 19, 24,
        10, 15, 20, 25
      ],
      [
        2, 3, 4, 5, 7, 9, 10, 12, 13, 14, 15, 20, 23, 25
      ],
      [
        1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18
      ],
      [
        1, 3, 6, 11, 12, 13, 14, 16, 17, 19, 21, 22, 23, 24
      ],
    ],
    bots: [
      {
        name: generateBotName(1600, 1),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1600, 2),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1300, 3),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1300, 4),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1300, 5),
        numberMarkDelay: 1300,
        boards: 2,
        victoryDelay: 3000
      },
    ],
    color: 'red',
    music: DARKNESS,
    tip: "El último powerup es aquel que permite retirar permanentemente a un bot de la partida, se llama `Eliminar un bot`, completa el nivel 29 para desbloquear ese powerup"
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
        name: generateBotName(700, 1),
        numberMarkDelay: 700,
        boards: 2,
        victoryDelay: 3500
      },
      {
        name: generateBotName(700, 2),
        numberMarkDelay: 700,
        boards: 3,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1000, 3),
        numberMarkDelay: 1000,
        boards: 2,
        victoryDelay: 3500
      },
      {
        name: generateBotName(1000, 4),
        numberMarkDelay: 1000,
        boards: 2,
        victoryDelay: 3500
      },
    ],
    color: 'red',
    music: SELFLESS,
    tip: "Ok, todavia los bots no se han rendido, en el siguiente nivel te enfrentaras a 8..., digo a 9 bots al mismo tiempo, piensa bien al elegir tus powerups, muchos jugadores no han podido formar el patrón objetivo"
  },
  {
    level: 30, // ULTIMO NIVEL
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
        name: generateBotName(1300, 1),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1900, 2),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 3000
      },
      {
        name: generateBotName(700, 3),
        numberMarkDelay: 700,
        boards: 1,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1600, 4),
        numberMarkDelay: 1600,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1300, 5),
        numberMarkDelay: 1300,
        boards: 1,
        victoryDelay: 3000
      },
      {
        name: generateBotName(700, 6),
        numberMarkDelay: 700,
        boards: 2,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1900, 7),
        numberMarkDelay: 1900,
        boards: 1,
        victoryDelay: 3000
      },
      {
        name: generateBotName(700, 8),
        numberMarkDelay: 700,
        boards: 1,
        victoryDelay: 3000
      },
      {
        name: generateBotName(1900, 9),
        numberMarkDelay: 1900,
        boards: 2,
        victoryDelay: 3000
      },
    ],
    color: 'red',
    music: ANYMORE,
    tip: "Solamente a un jugador se le ha ocurrido eliminar a su unico oponente en una partida con el powerup `Eliminar un bot` y ha terminado expulsado de la partida. ¡Espero que no hayas sido tu ese jugador!"
  },
  {
    level: 31,
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
        name: generateBotName(1000, 1),
        numberMarkDelay: 1000,
        boards: 3,
        victoryDelay: 6000
      },
    ],
    color: 'blue',
    music: SLOW,
    tip: "Completa los niveles 2, 5, 8 y asi sucesivamente para desbloquear un nuevo PowerUp."
  },
  {
    level: 32,
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
        name: generateBotName(1000, 1),
        numberMarkDelay: 1000,
        boards: 1,
        victoryDelay: 6000
      },
      {
        name: generateBotName(1200, 2),
        numberMarkDelay: 1200,
        boards: 1,
        victoryDelay: 6000
      },
      {
        name: generateBotName(1400, 3),
        numberMarkDelay: 1400,
        boards: 1,
        victoryDelay: 6000
      },
      {
        name: generateBotName(1200, 4),
        numberMarkDelay: 1200,
        boards: 1,
        victoryDelay: 6000
      },
    ],
    color: 'blue',
    music: TAP,
    tip: "Puedes aumentar los números objetivo generados a 5 durante 3 turnos con el PowerUp `Números objetivo extra`"
  },
  // {
  //   level: 31,
  //   targetText: "Columna o una fila de 5 números",
  //   boards: 1,
  //   patterns: [
  //     [1, 2, 3, 4, 5],
  //     [6, 7, 8, 9, 10],
  //     [11, 12, 13, 14, 15],
  //     [16, 17, 18, 19, 20],
  //     [21, 22, 23, 24, 25],
  //     [1, 6, 11, 16, 21],
  //     [2, 7, 12, 17, 22],
  //     [3, 8, 13, 18, 23],
  //     [4, 9, 14, 19, 24],
  //     [5, 10, 15, 20, 25],
  //   ],
  //   bots: [
  //     {
  //       name: "S-Bot",
  //       numberMarkDelay: 100,
  //       boards: 3,
  //       victoryDelay: 5000
  //     },
  //     {
  //       name: "S-Bot-2",
  //       numberMarkDelay: 100,
  //       boards: 2,
  //       victoryDelay: 5000
  //     },
  //     {
  //       name: "S-Bot-3",
  //       numberMarkDelay: 1000,
  //       boards: 2,
  //       victoryDelay: 100
  //     },
  //   ],
  //   color: 'stone',
  //   music: ANYMORE
  // },
]


