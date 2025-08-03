import { useAppStore } from '../../store/useAppStore'
import { powerups } from '../../data/powerups'
import PowerUpButton from './PowerUpButton';

// Componente para mostrar los powerups seleccionados por el usuario, se muestra en la interfaz de un nivel
export default function SelectedPowerUps() {
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)
    const powerUps = powerups.filter((powerUp) => selectedPowerUpsIds.includes(powerUp.id));
    const levelData = useAppStore((state) => state.levelData)
    return (
        <>
            <div className='flex flex-col 
             gap-2 rounded-xl p-3 bg-gray-700'>
                <div className='flex flex-col gap-2 text-center'>
                    <h2 className={` sm:text-xl text-xl md:text-2xl font-semibold sm:mb-2 text-${levelData.color}-500`}>PowerUps</h2>
                </div>
                <div className='flex flex-row gap-5 justify-center'>
                    {powerUps.map((powerUp) => (
                        <PowerUpButton
                            key={powerUp.id}
                            id={powerUp.id}
                            name={powerUp.name}
                            description={powerUp.description}
                            icon={powerUp.icon}
                            details={powerUp.details}
                            activateFunction={() => { }}
                            onHover={() => { }}
                            offHover={() => { }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
