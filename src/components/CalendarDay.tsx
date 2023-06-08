
interface propTypes {
    dayNumber: number
}

export const CalenderDay = ({dayNumber}: propTypes) => {

    return (
        <div>
            <p>{dayNumber}</p>
            
        </div>
    )
}