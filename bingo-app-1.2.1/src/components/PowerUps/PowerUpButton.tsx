import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";

type PowerUpButtonProps = {
    id: number;
    name: string;
    icon: string;
    typeButton: 'modal' | 'round';
}

export default function PowerUpButton({ id, name, icon, typeButton }: PowerUpButtonProps) {

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
    // const forceCrossPattern = useAppStore((state) => state.forceNumberObjectiveCross)
    // const autoMarkBoard = useAppStore((state) => state.automaticMarkBoard)
    const markNeighborgNumbers = useAppStore((state) => state.markNeighborgNumbers)
    // const viewAllBotBoards = useAppStore((state) => state.viewAllBotBoards)
    // const randomNumberObjective = useAppStore((state) => state.randomNumberObjective)
    // const killBot = useAppStore((state) => state.killBot)

    // Asignar a cada powerup del arreglo la acción y el estado correspondiente
    const activateSlowBots = useAppStore((state) => state.activateSlowBots)
    const activateExtraTargets = useAppStore((state) => state.activateExtraTargets)
    const activateUnmarkNumberBot = useAppStore((state) => state.activateUnmarkNumberBot)
    const activateSwapNumbersBoard = useAppStore((state) => state.activateSwapNumbersBoard)
    // const activateForceCrossPattern = useAppStore((state) => state.activateForceCrossPattern)
    // const activateAutoMarkBoard = useAppStore((state) => state.activateAutoMarkBoard)
    const activateMarkNeighborgNumbers = useAppStore((state) => state.activateMarkNeighborgNumbers)
    // const activateViewAllBotBoards = useAppStore((state) => state.activateViewAllBotBoards)
    // const activateRandomNumberObjective = useAppStore((state) => state.activateRandomNumberObjective)
    // const activateKillBot = useAppStore((state) => state.activateKillBot)

    // Asignar la acción correspondiente a cada powerup
    const powerUpsAction = id === 1 ? activateSlowBots : id === 2 ? activateExtraTargets : id === 3 ? activateUnmarkNumberBot : id === 4 ? activateSwapNumbersBoard : id === 6 ? activateMarkNeighborgNumbers : () => { };

    // Asignar el estado correspondiente a cada powerup
    const powerUpsState = id === 1 ? slowBots : id === 2 ? extraTargets : id === 3 ? unmarkNumberBot : id === 4 ? swapNumbersBoard : id === 6 ? markNeighborgNumbers : { hasActivated: false, active: false, turnsRemaining: 0 };

    const tooglePowerUp = useAppStore((state) => state.togglePowerUp);



    const handleClickButton = (id: number) => {
        if (typeButton === 'round') {
            powerUpsAction()
        } else {
            tooglePowerUp(id)
        }
    }

    useEffect(() => {
        console.log(selectedPowerUpsIds)
    }, [selectedPowerUpsIds])

    return (
        <>
            <button className={` flex justify-center items-center md:size-16 sm:size-14 size-11 border-none rounded-lg text-white cursor-pointer shadow-md shadow-black hover:bg-gray-900 ${isSelected ? `bg-${levelData.color}-500` : 'bg-gray-500'}`}
                onClick={() => handleClickButton(id)}>
                <img className={`size-6 sm:size-8 md:size-10 `} src={icon} alt={name} />
                {
                    typeButton === 'round' &&
                    <div className={`absolute top-11 left-11 bg-${levelData.color}-500 rounded-full size-6 flex items-center justify-center border-2 border-gray-700`}>{
                        powerUpsState.turnsRemaining || 99
                    }</div>
                }
            </button>
        </>
    )
}
