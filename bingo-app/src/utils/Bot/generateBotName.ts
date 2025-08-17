// Genera un nombre para el bot
export const generateBotName = (interval: number, index: number): string => {
  const speedCategory = interval >= 1800 ? "Strategic" : interval >= 1300 ? "Reactive" : "Aggressive";
  const int = index === 0 ? "" : `-${index}`
  return `${speedCategory}-Bot${int}`;
};
