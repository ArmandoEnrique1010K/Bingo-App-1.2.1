import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";

type PowerUpButtonProps = {
    id: number;
    name: string;
    description: string;
    icon: string;
    details: object;
    activateFunction: () => void;
    onHover: () => void;
    offHover: () => void;
}

export default function PowerUpButton({ id, name, description, icon, details, activateFunction, onHover, offHover }: PowerUpButtonProps) {

    const levelData = useAppStore((state) => state.levelData)

    // Verificar si el powerup ha sido seleccionado
    const selectedPowerUpsIds = useAppStore((state) => state.selectedPowerUpsIds)

    const isSelected = selectedPowerUpsIds.includes(id)

    useEffect(() => {
        console.log(selectedPowerUpsIds)
    }, [selectedPowerUpsIds])

    return (
        <>
            <button className={` flex justify-center items-center md:size-16 sm:size-13 size-12 border-none rounded-lg text-white cursor-pointer shadow-md shadow-black hover:bg-gray-900 ${isSelected ? `bg-${levelData.color}-500` : 'bg-gray-500'}`} onClick={activateFunction} onMouseOver={onHover} onMouseLeave={offHover}>
                <img className={`w-8 h-8 md:w-10 md:h-10 sm:w-12 sm:h-12`} src={icon} alt={name} />
            </button>
        </>
    )
}
