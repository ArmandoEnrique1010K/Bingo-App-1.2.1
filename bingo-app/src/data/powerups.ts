import { SLOW_BOTS, EXTRA_TARGETS, AUTO_MARK_BOARD, CROSS_PATTERN, MARK_NEIGHBORING_NUMBERS, VIEW_BOARDS_BOT, RANDOM_TARGET, REMOVE_BOT, UNMARK_NUMBER_BOT, SWAP_NUMBERS } from "../constants/powerupConstants";

// TODO: Para cambiar el orden de los powerups, modifica el orden de los elementos
export const powerups = [
    {
        id: EXTRA_TARGETS,
        name: "Números objetivos extra",
        description: "Aumenta en 2 los números objetivos generados durante 3 turnos",
        icon: "/images/powerups/two.svg",
        details: {}
    },
    {
        id: CROSS_PATTERN,
        name: "Forzar un patrón de cruz",
        description: "Haz clic sobre un número de tu tablero para que el siguiente numero objetivo sea uno de los numeros que aparecen tanto en la misma fila como en la misma columna",
        icon: "/images/powerups/cross.svg",
        details: {}
    },
    {
        id: UNMARK_NUMBER_BOT,
        name: "Desmarcar un número de un bot",
        description: "Haz clic sobre un número marcado de un tablero de un bot para desmarcarlo",
        icon: "/images/powerups/delete.svg",
        details: {}
    },
    {
        id: SLOW_BOTS,
        name: "Ralentizar bots",
        description: "Ralentiza a todos los bots durante 5 turnos",
        icon: "/images/powerups/slow.svg",
        details: {}
    },
    {
        id: SWAP_NUMBERS,
        name: "Intercambiar posiciones",
        description: "Haz clic sobre dos números de tu tablero para intercambiar las posiciones",
        icon: "/images/powerups/swap.svg",
        details: {}
    },
    {
        id: MARK_NEIGHBORING_NUMBERS,
        name: "Marcar numeros vecinos",
        description: "Si 'x' es un numero objetivo y marcas ese numero en tu tablero, se marcaran los números de la forma 'x-2', 'x-1', 'x+1' y 'x+2'",
        icon: "/images/powerups/wand.svg",
        details: {}
    },
    {
        id: AUTO_MARK_BOARD,
        name: "Automarcar un tablero",
        description: "Haz clic sobre uno de tus tableros para automarcarlo por 5 turnos",
        icon: "/images/powerups/gear.svg",
        details: {}
    },
    {
        id: VIEW_BOARDS_BOT,
        name: "Clarividencia",
        description: "Durante 5 turnos tu podras ver los números ocultos de los tableros de los bots",
        icon: "/images/powerups/eye.svg",
        details: {}
    },
    {
        id: RANDOM_TARGET,
        name: "Número aleatorio objetivo",
        description: "Podrás marcar solamente un número que no sea un número objetivo, ten en cuenta que los bots también podrán marcar un número aleatorio inmediatamente",
        icon: "/images/powerups/random.svg",
        details: {}
    },
    {
        id: REMOVE_BOT,
        name: "Eliminar un bot",
        description: "Haz clic sobre un bot para retirarlo permanentemente de la partida actual",
        icon: "/images/powerups/target_gun.svg",
        details: {}
    },
]