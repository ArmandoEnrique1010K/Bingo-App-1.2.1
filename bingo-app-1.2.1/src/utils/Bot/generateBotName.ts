
export const generateBotName = (interval: number, reactionTime: number, index: number): string => {

  // Asigna un nombre al bot de acuerdo a su caracteristica
  // Velocidad de marcado de numero
  const speedCategory = interval >= 1800 ? "Strategic" : interval >= 1300 ? "Reactive" : "Aggressive";

  // Velocidad de reaccion de grito de victoria
  const reactionCategory = reactionTime >= 5000 ? "Slow" : reactionTime >= 3000 ? "Medium" : "Fast";

  // Numero del bot
  const int = index === 0 ? "" : `-${index}`

  return `${reactionCategory}-${speedCategory}-Bot${int}`;
};
