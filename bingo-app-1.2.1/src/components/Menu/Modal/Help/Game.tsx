export default function Game() {
  return (
    <>
      <h3 className="text-2xl pt-2 font-bold ">Cómo jugar</h3>
      <ul className="list-decimal list-inside pl-5 space-y-2">
        <li>
          <span className="font-semibold">Iniciar partida: </span>
          En la sección de los números objetivos, presiona el botón "Iniciar"
          para comenzar el juego.
        </li>
        <li>
          <span className="font-semibold">Números aleatorios: </span>
          Durante 20 rondas, se generarán los números objetivos al azar, y
          deberás marcarlos en tu tablero. Los números generados ya no se
          volverán a generar en las siguientes rondas.
        </li>
        <li>
          <span className="font-semibold">Competencia con los bots: </span>
          Los bots también marcarán los números objetivos en sus tableros.
        </li>
        <li>
          <span className="font-semibold">Tableros múltiples: </span>
          Algunos niveles pueden requerir que juegues con dos tableros en
          simultáneo, pero solamente debes formar el patron ganador en uno de
          ellos.
        </li>
        <li>
          <span className="font-semibold">Fin del juego: </span> La partida
          termina cuando uno de los jugadores (tú o un bot) completa el patrón
          ganador en el tablero. En el caso de que el bot gane, aparecera el bot
          que te ha ganado.
        </li>
        <li>
          <span className="font-semibold">
            Desbloquear el siguiente nivel:{" "}
          </span>{" "}
          Si le ganastes a un bot, se desbloqueara el siguiente nivel, los
          niveles desbloqueados se almacenan en la memoria interna del navegador
          web.
        </li>
      </ul>
    </>
  );
}
