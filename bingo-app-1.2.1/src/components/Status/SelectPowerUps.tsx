import React, { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import PowerUpButton from '../PowerUps/PowerUpButton'
import { powerups } from '../../data/powerups'

export default function SelectPowerUps() {

    // Id de los powerups desbloqueados
    const unlockedPowerUpsIds = useAppStore((state) => state.unlockedPowerUpsIds)

    // Id de los powerups seleccionados
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)


    const selectPowerUp = useAppStore((state) => state.selectPowerUp)
    const unSelectPowerUp = useAppStore((state) => state.unSelectPowerUp)

    // Obtener los powerups desbloqueados
    const powerUps = powerups.filter((powerUp) => unlockedPowerUpsIds.includes(powerUp.id));

    const [currentSelectPowerUpName, setCurrentSelectPowerUpName] = useState('')
    const [currentSelectPowerUpDescription, setCurrentSelectPowerUpDescription] = useState('')
    // TODO: INICIALMENTE SE DEBE VERIFICAR SI HAY 3 POWERUPS DESBLOQUEADOS, NO SE DEBE MOSTRAR EL COMPONENTE PARA SELECCIONAR 3 POWERUPS, DE LO CONTRARIO SIEMPRE SE MOSTRARA

    // Función para agregar o quitar powerups
    const togglePowerUp = (id: number) => {
        if (selectedPowerUpsIds.includes(id)) {
            unSelectPowerUp(id)
        } else {
            selectPowerUp(id)
        }
    }

    return (
        <>
            <h2>Seleccione 3 powerups</h2>

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

            <div>{currentSelectPowerUpName}</div>
            <div>{currentSelectPowerUpDescription}</div>

            <div>Powerups seleccionados</div>
            <div>{selectedPowerUpsIds}</div>

        </>
    )
}
