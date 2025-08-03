import { useAppStore } from '../../store/useAppStore'
import { powerups } from '../../data/powerups'
import PowerUpButton from './PowerUpButton';

// Componente para mostrar los powerups seleccionados por el usuario, se muestra en la interfaz de un nivel
export default function SelectedPowerUps() {
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)
    // const levelData = useAppStore((state) => state.levelData)
    const unlockedPowerUpsIds = useAppStore((state) => state.unlockedPowerUpsIds)

    const powerUps = powerups.filter((powerUp) => selectedPowerUpsIds.includes(powerUp.id));
    return (
        <>
            <div className='flex flex-col 
             gap-2 rounded-xl p-3 bg-gray-700'>

                {unlockedPowerUpsIds.length === 0 ? (
                    <div className='flex flex-row gap-5 justify-center h-16 items-center'>
                        ¡No tienes powerups desbloqueados!
                    </div>
                ) : (

                    <div className='flex flex-row sm:gap-6 gap-2 justify-center xsm:gap-4'>
                        {powerUps.map((powerUp) => (
                            <div className='flex flex-row gap-2 relative' key={powerUp.id} >
                                <PowerUpButton
                                    id={powerUp.id}
                                    name={powerUp.name}
                                    icon={powerUp.icon}
                                    // description={powerUp.description}
                                    typeButton='round'
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
