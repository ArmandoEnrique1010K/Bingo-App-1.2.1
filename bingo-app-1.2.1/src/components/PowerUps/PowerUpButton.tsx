
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
    return (
        <>
            <button onClick={activateFunction} onMouseOver={onHover} onMouseLeave={offHover}>
                <img width={50} height={50} src={icon} alt={name} />
            </button>
        </>
    )
}
