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
                      href="https://www.npmjs.com/package/zustand"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Zustand
                    </a>{" "}
                    (Manejo del estado global)
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
                  <span className="font-bold">Sonidos:</span> Archivos de
                  sonidos proporcionados por Pixabay
                </p>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    <a
                      href="https://pixabay.com/es/sound-effects/error-126627/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Error - u_31vnwfmzt6
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pixabay.com/es/sound-effects/correct-2-46134/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Correct-2 - bwg2020 (Freesound)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pixabay.com/sound-effects/BALLS_SOUND4-39967/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      balls4 - amiga-mark (Freesound)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pixabay.com/sound-effects/coin-upaif-14631/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      coin-up.aif - mattwasser (Freesound)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pixabay.com/sound-effects/light-switch-156813/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Light Switch - SoundReality
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pixabay.com/es/sound-effects/failed-295059/"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Failed - u_3bsnvt0dsu
                    </a>
                  </li>
                </ul>

                <p>
                  <span className="font-bold">Música:</span> Versiones
                  instrumentales proporcionadas por Youtube:
                </p>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=ytNgTZ7mSVQ&ab_channel=anthony"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Tap Out - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=SOz7lmnOWXc&ab_channel=ZoomKaraokeOfficial"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Someday - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=EX1d8nXU23k&ab_channel=%EC%9C%A0%EB%AA%85%EC%9E%AC"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Slow Animals - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=pZfnxNNLuqU&ab_channel=toolmcbag"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Machu Picchu - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=98dfqaC4hfw&ab_channel=RadioZero"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Life is Simple in the Moonlight - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=cbhM-uzvb7A&ab_channel=RogerDemonSmear"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Under Cover of Darkness - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=u8w6htrt1IM&ab_channel=JustSingKaraoke"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Brooklyn Bridge to Chorus - The Strokes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=m5BEsI8KUzA&ab_channel=ObsKureKaraoke"
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      You Only Live Once - The Strokes
                    </a>
                  </li>
                </ul>

                <p>
                  <span className="font-bold">Emojis:</span> Proporcionados por
                  <a
                    href="https://emojipedia.org/"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {" "}
                    Emojipedia
                  </a>
                  .
                </p>
                <p>
                  <span className="font-bold">Loaders:</span> Loader de carga
                  <a
                    href="https://css-loaders.com/progress/"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {" "}
                    Progress #4
                  </a>{" "}
                  proporcionado por{" "}
                  <a
                    href="https://css-loaders.com/"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    CSS loaders
                  </a>
                  .
                </p>

                <p>
                  <span className="font-bold">Favicon:</span> Icono de{" "}
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
