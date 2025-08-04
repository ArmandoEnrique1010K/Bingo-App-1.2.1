import { useAppStore } from "../../store/useAppStore";

// TODO: ELIMINAR ESTE COMPONENTE
export default function ListPowerUps() {
  const activateExtraTargets = useAppStore(
    (state) => state.activateExtraTargets
  );

  const activateMarkNeighborgNumbers = useAppStore(
    (state) => state.activateMarkNeighborgNumbers
  );

  const activateSlowBots = useAppStore(
    (state) => state.activateSlowBots
  );

  const activateUnmarkNumberBot = useAppStore(
    (state) => state.activateUnmarkNumberBot
  );

  const extraTargets = useAppStore((state) => state.extraTargets);
  const markNeighborgNumbers = useAppStore((state) => state.markNeighborgNumbers);
  const slowBots = useAppStore((state) => state.slowBots);
  const unmarkNumberBot = useAppStore((state) => state.unmarkNumberBot);

  return (
    <>
      <div>
        <button
          onClick={() => {
            if (!extraTargets.hasActivated) {
              activateExtraTargets();
            }
          }}
        >
          Agregar 2 objetivos extra
        </button>
        Turnos: {extraTargets.turnsRemaining} <br></br>
        Activo: {extraTargets.active ? "SI" : "NO"}
      </div>

      <div>
        <button
          onClick={() => {
            if (!markNeighborgNumbers.hasActivated) {
              activateMarkNeighborgNumbers();
            }
          }}
        >
          {markNeighborgNumbers.active
            ? "Cancelar Vecinos"
            : "Activar Vecinos"}
        </button>
        Turnos: {markNeighborgNumbers.turnsRemaining} <br></br>
        Activo: {markNeighborgNumbers.active ? "SI" : "NO"}
      </div>


      <div>
        <button
          onClick={() => {
            if (!slowBots.hasActivated) {
              activateSlowBots();
            }
          }}
        >
          Ralentizar bots por 5 segundos
        </button>
        Turnos: {slowBots.turnsRemaining} <br></br>
        Activo: {slowBots.active ? "SI" : "NO"}
      </div>

      <div>
        <button
          onClick={() => {
            if (!unmarkNumberBot.hasActivated) {
              activateUnmarkNumberBot();
            }
          }}
        >
          {unmarkNumberBot.active
            ? "Desmarcar un numero del bot"
            : "Activar Desmarcar un numero del bot"}
        </button>
        Turnos: {unmarkNumberBot.turnsRemaining} <br></br>
        Activo: {unmarkNumberBot.active ? "SI" : "NO"}
      </div>



    </>
  );
}
