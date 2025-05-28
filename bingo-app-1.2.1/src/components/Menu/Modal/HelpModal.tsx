import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAppStore } from "../../../store/useAppStore";

export default function HelpModal() {
  const closeHelpModal = useAppStore((state) => state.closeHelpModal);
  const showHelpModal = useAppStore((state) => state.showHelpModal);

  // TODO: DESCOMPONER EN SUBCOMPONENTES ESTE COMPONENTES
  return (
    <>
      <Dialog
        open={showHelpModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeHelpModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center  mb-10"
              >
                Instrucciones
              </DialogTitle>
              <div className="text-lg space-y-4">
                <h3 className="text-2xl font-bold">¡Bienvenido a BingoApp!</h3>
                <p>
                  Tu objetivo es derrotar a los bots en un juego de Bingo. Sé el
                  primero en completar el patrón ganador antes que ellos.
                </p>
                <h3 className="text-2xl pt-2 font-bold">Menú principal</h3>
                <p>
                  En el menú principal encontrarás varias opciones para
                  interactuar con el juego:
                </p>
                <ul className="list-disc list-inside pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Niveles: </span>Accede a los
                    distintos niveles del juego. A medida que avances, podrás
                    desbloquear nuevos desafíos.
                  </li>
                  <li>
                    <span className="font-semibold">Música: </span> Activa o
                    desactiva la música de fondo.
                  </li>
                  <li>
                    <span className="font-semibold">Créditos: </span>Consulta la
                    información sobre los creadores del juego.
                  </li>
                  <li>
                    <span className="font-semibold">Reinicio: </span>Reinicia la
                    partida actual.
                  </li>
                  <li>
                    <span className="font-semibold">Abandonar partida: </span>
                    Termina la partida y redirige al menú principal.
                  </li>
                </ul>
                <h3 className="text-2xl pt-2 font-bold ">Cómo jugar</h3>
                <ul className="list-decimal list-inside pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Iniciar partida: </span>
                    Presiona el botón "Iniciar partida" para comenzar el juego.
                  </li>
                  <li>
                    <span className="font-semibold">Números aleatorios: </span>
                    Se generarán números al azar, y deberás buscarlos en tu
                    tablero para marcarlos.
                  </li>
                  <p>
                    <span className="font-semibold text-amber-500">
                      Advertencia:{" "}
                    </span>
                    Los números generados ya no se volverán a generar en las
                    siguientes rondas.
                  </p>
                  <li>
                    <span className="font-semibold">
                      Competencia con los bots:
                    </span>
                    Los bots también marcarán números en sus tableros al mismo
                    tiempo.
                  </li>
                  <li>
                    <span className="font-semibold">Tableros múltiples: </span>
                    Algunos niveles pueden requerir que juegues con dos tableros
                    en simultáneo.
                  </li>
                  <li>
                    <span className="font-semibold">Fin del juego: </span> La
                    partida termina cuando uno de los jugadores (tú o un bot)
                    completa el patrón ganador en al menos un tablero.
                  </li>
                </ul>
                <h3 className="text-2xl pt-2 font-bold">¿Como ganar?</h3>
                <p>
                  Marca los números correctamente en tu tablero. Cuando creas
                  haber completado el patrón, presiona el botón {""}
                  <span className="font-semibold">"Comprobar patrón"</span>. Si
                  el patrón es correcto, ganas la partida. Si un bot completa el
                  patrón antes que tú, perderás y deberás intentarlo de nuevo.
                </p>

                <h3 className="text-2xl pt-2 font-bold">
                  Dificultad por colores
                </h3>
                <p>
                  Los niveles estan representados por colores: patrón antes que
                </p>
                <ul className="list-decimal list-inside pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Azul: </span>Marca al menos
                    6 números para formar el patrón objetivo.
                  </li>
                  <li>
                    <span className="font-semibold">Cyan: </span>
                    Algunos niveles tienen 2 tableros para el jugador.
                  </li>
                  <li>
                    <span className="font-semibold">Esmeralda: </span>
                    Aumenta el número de bots en un nivel.
                  </li>
                  <li>
                    <span className="font-semibold">Lima: </span>
                    Algunos niveles poseen 4 combinaciones del patron objetivo.
                  </li>
                  <li>
                    <span className="font-semibold">Amber: </span> Algunos
                    niveles tienen un solo patrón objetivo.
                  </li>
                  <li>
                    <span className="font-semibold">Rojo: </span> Tu tienes 2
                    tableros en cada nivel.
                  </li>
                  <li>
                    <span className="font-semibold">Marrón: </span> Los bots son
                    más rapidos.
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                <Button
                  onClick={closeHelpModal}
                  className="w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg  shadow-black shadow-md hover:bg-gray-900 cursor-pointer"
                >
                  Cerrar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

/* TODO: CAMBIO DE OPACIDAD EN TAILWIND CSS 4 https://tailwindcss.com/docs/background-color#changing-the-opacity */
