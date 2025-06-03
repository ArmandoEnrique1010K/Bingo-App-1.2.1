export default function Victory() {
  return (
    <>
      <h3 className="text-2xl pt-2 font-bold">¿Como ganar?</h3>
      <p>
        Marca los números correctamente en tu tablero. Cuando creas haber
        completado el patrón, presiona el botón {""} que indica el patron
        objetivo para {""}
        <span className="font-semibold">
          comprobar el patrón en uno de tus tableros{" "}
        </span>
        . Si el patrón es correcto, ganas la partida. Si un bot completa el
        patrón antes que tú, perderás y deberás intentarlo de nuevo.
      </p>
    </>
  );
}
