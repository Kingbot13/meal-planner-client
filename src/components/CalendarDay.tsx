import { ReactNode } from "react"

interface propTypes {
    dayNumber: number,
    children: ReactNode
}

export const CalendarDay = ({dayNumber, children}: propTypes) => {

    return (
        <div>
            <p>{dayNumber}</p>
            {children}
        </div>
    )
}