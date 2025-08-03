import { useAppStore } from '../../store/useAppStore'
import PowerUpButton from '../PowerUps/PowerUpButton'
import { powerups } from '../../data/powerups'
import { MAX_POWERUPS } from '../../constants/defaultConfigs'

export default function PowerUpsContainer() {

    // Id de los powerups desbloqueados
    const unlockedPowerUpsIds = useAppStore((state) => state.unlockedPowerUpsIds)

    // Id de los powerups seleccionados
    // const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)


    const currentSelectPowerUpName = useAppStore((state) => state.currentSelectPowerUpName)
    const currentSelectPowerUpDescription = useAppStore((state) => state.currentSelectPowerUpDescription)

    // Obtener los powerups desbloqueados
    const powerUps = powerups.filter((powerUp) => unlockedPowerUpsIds.includes(powerUp.id));

    // const [currentSelectPowerUpName, setCurrentSelectPowerUpName] = useState('')
    // const [currentSelectPowerUpDescription, setCurrentSelectPowerUpDescription] = useState('')
    // TODO: INICIALMENTE SE DEBE VERIFICAR SI HAY 3 POWERUPS DESBLOQUEADOS, NO SE DEBE MOSTRAR EL COMPONENTE PARA SELECCIONAR 3 POWERUPS, DE LO CONTRARIO SIEMPRE SE MOSTRARA


    return (
        <>
            <h2>Seleccione {MAX_POWERUPS} powerups</h2>
            <div className={`grid grid-cols-5 place-items-center gap-3`}>

                {powerUps.map((powerUp) => (
                    <PowerUpButton
                        key={powerUp.id}
                        id={powerUp.id}
                        name={powerUp.name}
                        icon={powerUp.icon}
                        description={powerUp.description}
                        typeButton='modal'
                    />
                ))}
            </div>
            <div className='flex flex-col gap-2 h-40 sm:h-28 text-base mt-6'>
                <div className='font-semibold text-center'>{currentSelectPowerUpName}</div>
                <div className='text-center'>{currentSelectPowerUpDescription}</div>
            </div>
        </>
    )
}
