import { useAppStore } from "../../store/useAppStore";

// TODO: MEJORAR ESTO, AÑADIR MÁS POWERUPS
export default function ListPowerUps() {
  const activateExtraTargets = useAppStore(
    (state) => state.activateExtraTargets
  );

  const toggleMarkNeighborgNumbers = useAppStore(
    (state) => state.toggleMarkNeighborgNumbers
  );

  const activateSlowBots = useAppStore(
    (state) => state.activateSlowBots
  );

  const toggleUnmarkNumberBot = useAppStore(
    (state) => state.toggleUnmarkNumberBot
  );  

  const powerups = useAppStore((state) => state.powerups);

  return (
    <>
      <div>
        <button
          onClick={() => {
            if (!powerups.extraTargets.hasActivated) {
              activateExtraTargets();
            }
          }}
        >
          Agregar 2 objetivos extra
        </button>
        Turnos: {powerups.extraTargets.turnsRemaining} <br></br>
        Activo: {powerups.extraTargets.active ? "SI" : "NO"}
      </div>

      <div>
        <button
          onClick={() => {
            if (!powerups.markNeighborgNumbers.hasActivated) {
              toggleMarkNeighborgNumbers();
            }
          }}
        >
          {powerups.markNeighborgNumbers.active
            ? "Cancelar Vecinos"
            : "Activar Vecinos"}
        </button>
        Turnos: {powerups.markNeighborgNumbers.turnsRemaining} <br></br>
        Activo: {powerups.markNeighborgNumbers.active ? "SI" : "NO"}
      </div>


      <div>
        <button
          onClick={() => {
            if (!powerups.slowBots.hasActivated) {
              activateSlowBots();
            }
          }}
        >
          Ralentizar bots por 5 segundos
        </button>
        Turnos: {powerups.slowBots.turnsRemaining} <br></br>
        Activo: {powerups.slowBots.active ? "SI" : "NO"}
      </div>

      <div>
        <button
          onClick={() => {
            if (!powerups.unmarkNumberBot.hasActivated) {
              toggleUnmarkNumberBot();
            }
          }}
        >
          {powerups.unmarkNumberBot.active
            ? "Desmarcar un numero del bot"
            : "Activar Desmarcar un numero del bot"}
        </button>
        Turnos: {powerups.unmarkNumberBot.turnsRemaining} <br></br>
        Activo: {powerups.unmarkNumberBot.active ? "SI" : "NO"}
      </div>



    </>
  );
}
