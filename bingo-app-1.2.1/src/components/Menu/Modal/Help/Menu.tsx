export default function Menu() {
  return (
    <>
      <h3 className="text-2xl pt-2 font-bold">Menú principal</h3>
      <p>
        En el menú principal encontrarás varias opciones para interactuar con el
        juego:
      </p>
      <ul className="list-disc list-inside pl-5 space-y-2">
        <li>
          <span className="font-semibold">Niveles: </span>Accede a los distintos
          niveles del juego. A medida que completes los desafios podras
          desbloquear los niveles.
        </li>
        <li>
          <span className="font-semibold">Música: </span> Activa o desactiva la
          música de fondo.
        </li>
        <li>
          <span className="font-semibold">Sonido: </span> Activa o desactiva los
          sonidos.
        </li>
        <li>
          <span className="font-semibold">Créditos: </span>Consulta la
          información sobre los creadores del juego.
        </li>
        <li>
          <span className="font-semibold">Reiniciar partida: </span>Reinicia la
          partida actual.
        </li>
        <li>
          <span className="font-semibold">Abandonar partida: </span>
          Termina la partida y redirige al menú principal.
        </li>
      </ul>
    </>
  );
}
