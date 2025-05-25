import { useAppStore } from "../../store/useAppStore";

export default function ListPowerUps() {
  const activateExtraTargets = useAppStore(
    (state) => state.activateExtraTargets
  );
  const powerups = useAppStore((state) => state.powerups);

  return (
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
  );
}
