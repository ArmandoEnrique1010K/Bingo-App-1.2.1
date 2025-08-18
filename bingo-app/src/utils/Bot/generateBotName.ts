// Genera un nombre para el bot
export const generateBotName = (numberMarkDelay: number, index: number): string => {
  const speedCategory = numberMarkDelay >= 1800 ? "Lento"
    : numberMarkDelay >= 1400 ? "Medio"
      : numberMarkDelay >= 1000 ? "Rápido"
        : "Agresivo";

  const int = index === 0 ? "" : `${index}`
  return `Bot-${speedCategory}-${int}`;
};
