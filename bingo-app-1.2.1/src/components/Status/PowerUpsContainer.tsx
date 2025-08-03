import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import PowerUpButton from '../PowerUps/PowerUpButton'
import { powerups } from '../../data/powerups'
import { MAX_POWERUPS } from '../../constants/defaultConfigs'
import { CORRECT_SOUND, WRONG_SOUND } from '../../constants/audioSettings'

export default function PowerUpsContainer() {

    // Id de los powerups desbloqueados
    const unlockedPowerUpsIds = useAppStore((state) => state.unlockedPowerUpsIds)

    // Id de los powerups seleccionados
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)


    const selectPowerUp = useAppStore((state) => state.selectPowerUp)
    const unSelectPowerUp = useAppStore((state) => state.unSelectPowerUp)
    const playSound = useAppStore((state) => state.playSound)

    // Obtener los powerups desbloqueados
    const powerUps = powerups.filter((powerUp) => unlockedPowerUpsIds.includes(powerUp.id));

    const [currentSelectPowerUpName, setCurrentSelectPowerUpName] = useState('')
    const [currentSelectPowerUpDescription, setCurrentSelectPowerUpDescription] = useState('')
    // TODO: INICIALMENTE SE DEBE VERIFICAR SI HAY 3 POWERUPS DESBLOQUEADOS, NO SE DEBE MOSTRAR EL COMPONENTE PARA SELECCIONAR 3 POWERUPS, DE LO CONTRARIO SIEMPRE SE MOSTRARA

    // Función para agregar o quitar powerups
    const togglePowerUp = (id: number) => {

        // Si el powerup ya esta seleccionado, se deselecciona, de lo contrario se selecciona
        if (selectedPowerUpsIds.includes(id)) {
            unSelectPowerUp(id)
            playSound(WRONG_SOUND)
        } else {
            // Si el numero de powerups seleccionados es mayor o igual al maximo, no se puede seleccionar otro
            if (selectedPowerUpsIds.length >= MAX_POWERUPS) {
                playSound(WRONG_SOUND)
                return;
            }
            selectPowerUp(id)
            playSound(CORRECT_SOUND)
        }
    }

    return (
        <>
            <h2>Seleccione 3 powerups</h2>
            <div className={`grid grid-cols-5 place-items-center gap-3`}>

                {powerUps.map((powerUp) => (
                    <PowerUpButton
                        key={powerUp.id}
                        id={powerUp.id}
                        name={powerUp.name}
                        description={powerUp.description}
                        icon={powerUp.icon}
                        details={powerUp.details}
                        activateFunction={() => {
                            togglePowerUp(powerUp.id)
                        }}
                        onHover={() => {
                            setCurrentSelectPowerUpName(powerUp.name)
                            setCurrentSelectPowerUpDescription(powerUp.description)
                        }}
                        offHover={() => {
                            setCurrentSelectPowerUpName('')
                            setCurrentSelectPowerUpDescription('')
                        }}
                    />
                ))}
            </div>
            <div className='flex flex-col gap-2 h-28 text-base mt-6'>
                <div className='font-semibold text-center'>{currentSelectPowerUpName}</div>
                <div className='text-center'>{currentSelectPowerUpDescription}</div>
            </div>
        </>
    )
}
