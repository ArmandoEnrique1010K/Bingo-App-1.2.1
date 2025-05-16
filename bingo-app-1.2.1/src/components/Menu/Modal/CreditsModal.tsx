import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAppStore } from "../../../store/useAppStore";

export default function CreditsModal() {
  const showCreditsModal = useAppStore((state) => state.showCreditsModal);
  const closeCreditsModal = useAppStore((state) => state.closeCreditsModal);

  return (
    <>
      <Dialog
        open={showCreditsModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeCreditsModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center mb-10"
              >
                Créditos del autor
              </DialogTitle>
              <div className="space-y-4 text-lg">
                <p>
                  <span className="font-bold">Desarrollado por:</span>{" "}
                  ArmandoEnrique1010K
                </p>
                <p>
                  Esta aplicación fue creada como un proyecto para aplicar los
                  conocimientos adquiridos en Udemy.
                </p>
                <p>
                  <span className="font-bold">
                    Agradecimientos especiales a:
                  </span>{" "}
                  Juan Pablo de la Torre.
                </p>

                <p>
                  <span className="font-bold">Tecnologías utilizadas:</span>
                </p>
                <ul className="list-disc list-inside pl-4">
                  <li>HTML</li>
                  <li>TailwindCSS</li>
                  <li>TypeScript</li>
                  <li>ReactJS</li>
                </ul>

                <p>
                  <span className="font-bold">Librerías utilizadas:</span>
                </p>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    <a
                      href="https://www.npmjs.com/package/@heroicons/react"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      HeroIcons
                    </a>{" "}
                    (iconos)
                  </li>
                  <li>
                    <a
                      href="https://headlessui.com/react/dialog"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      HeadlessUI
                    </a>{" "}
                    (componentes accesibles)
                  </li>
                  <li>
                    <a
                      href="https://tonejs.github.io/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      ToneJS
                    </a>{" "}
                    (sonidos)
                  </li>
                </ul>

                <p>
                  <span className="font-bold">Música:</span> "Tap Out"
                  (Instrumental) - The Strokes (2013).
                </p>

                <p>
                  <span className="font-bold">Favicon: </span>
                  Icono de{" "}
                  <a
                    href="https://icons8.com/icon/25336/bingo"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Bingo
                  </a>{" "}
                  proporcionado por{" "}
                  <a
                    href="https://icons8.com"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Icons8
                  </a>{" "}
                  y{" "}
                  <a
                    href="https://www.svgrepo.com/"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    SVG Repo
                  </a>
                  .
                </p>
              </div>

              <div className="mt-10">
                <Button
                  onClick={closeCreditsModal}
                  className="w-full py-2 px-4 cursor-pointer bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none "
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

// TODO: AGREGAR LOS CREDITOS

// ICONOS DE HEROICONS
// https://www.npmjs.com/package/@heroicons/react

// HEADLESS UI
// https://headlessui.com/react/dialog

// EMOJIPEDIA
// https://emojipedia.org/

// ARCHIVOS DE SONIDO
// https://pixabay.com/es/sound-effects/error-126627/
// https://pixabay.com/es/sound-effects/correct-2-46134/
// https://pixabay.com/sound-effects/BALLS_SOUND4-39967/
// https://pixabay.com/sound-effects/coin-upaif-14631/
// https://pixabay.com/sound-effects/light-switch-156813/
// https://pixabay.com/es/sound-effects/failed-295059/

// LOADER DE CARGA
// https://css-loaders.com/progress/
