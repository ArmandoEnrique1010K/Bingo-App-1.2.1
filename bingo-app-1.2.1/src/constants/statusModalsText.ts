import { Modal } from "../types"

// TIPOS DE VENTANA MODAL VENTANA MODAL
export const VICTORY_MODAL: Modal = {
  type: "victory",
  subType: "level_completed",
  title: "Felicidades, usted gano🏅",
  message: "Usted a derrotado a los bots. Puedes proceder al siguiente nivel.",
  textButton: {
    left: "Siguiente nivel",
    right: "Salir al menú"
  }
}

export const FINAL_LEVEL_VICTORY_MODAL: Modal = {
  type: "victory",
  subType: "game_completed",
  title: VICTORY_MODAL.title,
  message: "Usted a derrotado a todos los bots del juego.",
  textButton: {
    left: "Salir al menú", // FALSY
    right: "",
  }
}

export const DEFEAT_MODAL: Modal = {
  type: "defeat",
  subType: "game_over",
  title: "Fin del juego🤖",
  message: "¿Deseas volver a intentar este nivel? ",
  textButton: {
    left: "Volver a intentarlo",
    right: "Salir al menú"
  }
}

export const NO_MORE_ROUNDS_MODAL: Modal = {
  type: "defeat",
  subType: "no_rounds",
  title: "No hay más intentos🎲",
  message: "Usted ha sobrepasado el limite de turnos. ¿Deseas volver a intentar este nivel?",
  textButton: DEFEAT_MODAL.textButton
}


export const RESET_LEVEL_MODAL: Modal = {
  type: "reboot",
  subType: "reset_level",
  title: "¿Deseas reiniciar la partida?🔃",
  message: "Tu progreso actual no se guardara. ",
  textButton: {
    left: "Si",
    right: "No"
  }
}


export const EXIT_MODAL: Modal = {
  type: "exit",
  subType: "exit_level",
  title: "¿Deseas abandonar la partida?🚪",
  message: "Tu progreso actual no se guardara. ",
  textButton: {
    left: "Si",
    right: "No"
  }
}

export const START_LEVEL_MODAL: Modal = {
  type: "start",
  subType: "start_level",
  title: "Nivel ",
  message: "¿Listo para empezar?",
  textButton: {
    left: "Si",
    right: ""
  }
}

export const NONE_MODAL: Modal = {
  type: "undefined",
  subType: "undefined",
  title: "",
  message: "",
  textButton: {
    left: "",
    right: ""
  }
}
