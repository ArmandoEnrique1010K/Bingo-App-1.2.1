import { useAppStore } from "../../store/useAppStore";
import { CORRECT_SOUND, WRONG_SOUND } from "../../constants/audioSettings";
import { AUTO_MARK_BOARD, CROSS_PATTERN, EXTRA_TARGETS, MARK_NEIGHBORING_NUMBERS, REMOVE_BOT, SLOW_BOTS, SWAP_NUMBERS, UNMARK_NUMBER_BOT, VIEW_BOARDS_BOT } from "../../constants/powerupConstants";

type PowerUpButtonProps = {
    id: number;
    name: string;
    icon: string;
    description?: string;
    typeButton: 'modal' | 'round';
}

export default function PowerUpButton({ id, name, icon, description, typeButton }: PowerUpButtonProps) {

    const levelData = useAppStore((state) => state.levelData)

    // Verificar si el powerup ha sido seleccionado
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)

    const isSelected = selectedPowerUpsIds.includes(id)

    //**************** */
    // Obtener todos los datos del state de cada uno de los powerups
    const slowBots = useAppStore((state) => state.slowBots)
    const extraTargets = useAppStore((state) => state.extraTargets)
    const unmarkNumberBot = useAppStore((state) => state.unmarkNumberBot)
    const swapNumbersBoard = useAppStore((state) => state.swapNumbersBoard)
    const forceNumberObjectiveCross = useAppStore((state) => state.forceNumberObjectiveCross)
    const automaticMarkBoard = useAppStore((state) => state.automaticMarkBoard)
    const markNeighborgNumbers = useAppStore((state) => state.markNeighborgNumbers)
    const viewAllBotBoards = useAppStore((state) => state.viewAllBotBoards)
    // const randomNumberObjective = useAppStore((state) => state.randomNumberObjective)
    const killBot = useAppStore((state) => state.killBot)

    // Asignar a cada powerup del arreglo la acción y el estado correspondiente
    const activateSlowBots = useAppStore((state) => state.activateSlowBots)
    const activateExtraTargets = useAppStore((state) => state.activateExtraTargets)
    const activateUnmarkNumberBot = useAppStore((state) => state.activateUnmarkNumberBot)
    const activateSwapNumbersBoard = useAppStore((state) => state.activateSwapNumbersBoard)
    const activateForceNumberObjectiveCross = useAppStore((state) => state.activateForceNumberObjectiveCross)
    const activateAutomaticMarkBoard = useAppStore((state) => state.activateAutomaticMarkBoard)
    const activateMarkNeighborgNumbers = useAppStore((state) => state.activateMarkNeighborgNumbers)
    const activateViewAllBotBoards = useAppStore((state) => state.activateViewAllBotBoards)
    // const activateRandomNumberObjective = useAppStore((state) => state.activateRandomNumberObjective)
    const activateKillBot = useAppStore((state) => state.activateKillBot)

    // Asignar la acción correspondiente a cada powerup
    const powerUpsAction =
        id === SLOW_BOTS ? activateSlowBots :
            id === EXTRA_TARGETS ? activateExtraTargets :
                id === UNMARK_NUMBER_BOT ? activateUnmarkNumberBot :
                    id === SWAP_NUMBERS ? activateSwapNumbersBoard :
                        id === CROSS_PATTERN ? activateForceNumberObjectiveCross :
                            id === MARK_NEIGHBORING_NUMBERS ? activateMarkNeighborgNumbers :
                                id === VIEW_BOARDS_BOT ? activateViewAllBotBoards :
                                    id === REMOVE_BOT ? activateKillBot :
                                        id === AUTO_MARK_BOARD ? activateAutomaticMarkBoard :
                                            () => { };

    // Asignar el estado correspondiente a cada powerup
    const powerUpsState =
        id === SLOW_BOTS ? slowBots :
            id === EXTRA_TARGETS ? extraTargets :
                id === UNMARK_NUMBER_BOT ? unmarkNumberBot :
                    id === SWAP_NUMBERS ? swapNumbersBoard :
                        id === CROSS_PATTERN ? forceNumberObjectiveCross :
                            id === MARK_NEIGHBORING_NUMBERS ? markNeighborgNumbers :
                                id === VIEW_BOARDS_BOT ? viewAllBotBoards :
                                    id === REMOVE_BOT ? killBot :
                                        id === AUTO_MARK_BOARD ? automaticMarkBoard :
                                            { hasActivated: false, active: false, turnsRemaining: 0, type: 'oneTime' };

    const tooglePowerUp = useAppStore((state) => state.togglePowerUp);

    const playSound = useAppStore((state) => state.playSound);

    const changeCurrentSelectPowerUp = useAppStore((state) => state.changeCurrentSelectPowerUp);

    const cancelPowerUp = useAppStore((state) => state.cancelPowerUp);

    const handleClickButton = (id: number) => {
        if (typeButton === 'round' && !powerUpsState.hasActivated && !powerUpsState.active) {
            playSound(CORRECT_SOUND)
            console.log('Ha activado el powerup ' + id)
            powerUpsAction()
            return
        }

        if (typeButton === 'round' && powerUpsState.active && powerUpsState.type === 'oneTime' && !powerUpsState.hasActivated) {
            playSound(WRONG_SOUND)
            // CANCELAR LA ACCIÓN QUE VA A REALIZAR EL BOTÓN
            cancelPowerUp(id)
            return
        }

        // ARREGLAR LA LOGICA PARA DESACTIVAR EL POWERUP SI YA HA SIDO ACTIVADO

        if (typeButton === 'modal') {
            tooglePowerUp(id)
            return
        }
    }

    const applyStyle = () => {

        if (isSelected) {

            if (typeButton === 'round' && powerUpsState.active && powerUpsState.type === 'continuous') {
                return 'bg-gray-500'
            }

            // TODO: ES IMPOSIBLE APLICARLE UN HOVER HACIA EL BOTON DE TIPO oneTime ANTES DE SER ACTIVADO
            if (typeButton === 'round' && powerUpsState.active && powerUpsState.type === 'oneTime') {
                return `bg-${levelData.color}-500 bg-button-continuous`
            }



            if (typeButton === 'round' && powerUpsState.hasActivated && powerUpsState.type === 'continuous') {
                return 'bg-gray-700'
            }

            if (typeButton === 'round' && powerUpsState.hasActivated && powerUpsState.type === 'oneTime') {
                return 'bg-gray-700'
            }


            return `bg-${levelData.color}-500`


        } else {
            return 'bg-gray-500'
        }
    }

    const textOnButton = () => {
        if (typeButton === 'round' && powerUpsState.active && powerUpsState.type === 'continuous') {
            return powerUpsState.turnsRemaining
        }

        if (typeButton === 'round' && powerUpsState.active && powerUpsState.type === 'oneTime') {
            return 'A'
        }

        if (typeButton === 'round' && powerUpsState.hasActivated) {
            return 'X'
        }
        return 'R'
    }
    // useEffect(() => {
    //     console.log(selectedPowerUpsIds)
    // }, [selectedPowerUpsIds])

    return (
        <>
            <button className={`flex justify-center items-center xsm:size-12 md:size-16 sm:size-14 size-10 border-none rounded-lg
              cursor-pointer shadow-md shadow-black hover:bg-gray-900 text-${levelData.color}-500 ${applyStyle()} `}
                onClick={() => handleClickButton(id)} onMouseEnter={() => changeCurrentSelectPowerUp(name, description || '')} onMouseLeave={() => changeCurrentSelectPowerUp('', '')}
            // disabled={powerUpsState.hasActivated}
            >
                <img className={`size-6 xsm:size-8 sm:size-8 md:size-10 `} src={icon} alt={name} />
                {
                    typeButton === 'round' &&
                    <div className={`absolute -bottom-3 -right-3 z-10 bg-${levelData.color}-500 text-white rounded-full size-6 flex items-center justify-center border-2 border-gray-700`}>{
                        textOnButton()
                    }</div>
                }
            </button>
        </>
    )
}
