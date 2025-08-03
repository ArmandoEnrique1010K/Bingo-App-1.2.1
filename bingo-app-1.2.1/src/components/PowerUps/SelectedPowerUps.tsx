import { useAppStore } from '../../store/useAppStore'
import { powerups } from '../../data/powerups'
import PowerUpButton from './PowerUpButton';

// Componente para mostrar los powerups seleccionados por el usuario, se muestra en la interfaz de un nivel
export default function SelectedPowerUps() {
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)
    // const levelData = useAppStore((state) => state.levelData)
    const unlockedPowerUpsIds = useAppStore((state) => state.unlockedPowerUpsIds)

    const powerUps = powerups.filter((powerUp) => selectedPowerUpsIds.includes(powerUp.id));
    // // Obtener todos los datos del state de cada uno de los powerups
    // const slowBots = useAppStore((state) => state.slowBots)
    // const extraTargets = useAppStore((state) => state.extraTargets)
    // const unmarkNumberBot = useAppStore((state) => state.unmarkNumberBot)
    // const swapNumbersBoard = useAppStore((state) => state.swapNumbersBoard)
    // // const forceCrossPattern = useAppStore((state) => state.forceNumberObjectiveCross)
    // // const autoMarkBoard = useAppStore((state) => state.automaticMarkBoard)
    // const markNeighborgNumbers = useAppStore((state) => state.markNeighborgNumbers)
    // // const viewAllBotBoards = useAppStore((state) => state.viewAllBotBoards)
    // // const randomNumberObjective = useAppStore((state) => state.randomNumberObjective)
    // // const killBot = useAppStore((state) => state.killBot)

    // // Asignar a cada powerup del arreglo la acción y el estado correspondiente
    // const activateSlowBots = useAppStore((state) => state.activateSlowBots)
    // const activateExtraTargets = useAppStore((state) => state.activateExtraTargets)
    // const activateUnmarkNumberBot = useAppStore((state) => state.activateUnmarkNumberBot)
    // const activateSwapNumbersBoard = useAppStore((state) => state.activateSwapNumbersBoard)
    // // const activateForceCrossPattern = useAppStore((state) => state.activateForceCrossPattern)
    // // const activateAutoMarkBoard = useAppStore((state) => state.activateAutoMarkBoard)
    // const activateMarkNeighborgNumbers = useAppStore((state) => state.activateMarkNeighborgNumbers)
    // // const activateViewAllBotBoards = useAppStore((state) => state.activateViewAllBotBoards)
    // // const activateRandomNumberObjective = useAppStore((state) => state.activateRandomNumberObjective)
    // // const activateKillBot = useAppStore((state) => state.activateKillBot)

    // // Asignar la acción correspondiente a cada powerup
    // const powerUpsActions = powerUps.map((powerUp) => {
    //     switch (powerUp.id) {
    //         case 1:
    //             console.log('activando slow bots')
    //             return activateSlowBots;
    //         case 2:
    //             console.log('activando extra targets')
    //             return activateExtraTargets;
    //         case 3:
    //             console.log('activando unmark number bot')
    //             return activateUnmarkNumberBot;
    //         case 4:
    //             console.log('activando swap numbers board')
    //             return activateSwapNumbersBoard;
    //         case 6:
    //             console.log('activando mark neighborg numbers')
    //             return activateMarkNeighborgNumbers;
    //         default:
    //             return () => { };
    //             break;
    //     }
    // });

    // // Asignar el estado correspondiente a cada powerup
    // const powerUpsStates = powerUps.map((powerUp) => {
    //     switch (powerUp.id) {
    //         case 1:
    //             return slowBots;
    //         case 2:
    //             return extraTargets;
    //         case 3:
    //             return unmarkNumberBot;
    //         case 4:
    //             return swapNumbersBoard;
    //         case 6:
    //             return markNeighborgNumbers;
    //         default:
    //             return { hasActivated: false, active: false, turnsRemaining: 0 };
    //     }
    // });

    return (
        <>
            <div className='flex flex-col 
             gap-2 rounded-xl p-3 bg-gray-700'>

                {unlockedPowerUpsIds.length === 0 ? (
                    <div className='flex flex-row gap-5 justify-center h-16 items-center'>
                        ¡No tienes powerups desbloqueados!
                    </div>
                ) : (

                    <div className='flex flex-row gap-5 justify-center'>
                        {powerUps.map((powerUp) => (
                            <div className='flex flex-row gap-2 relative' key={powerUp.id} >
                                <PowerUpButton
                                    id={powerUp.id}
                                    name={powerUp.name}
                                    icon={powerUp.icon}
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
