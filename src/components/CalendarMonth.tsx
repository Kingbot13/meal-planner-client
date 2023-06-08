import { getMonth } from "date-fns"


export const CalenderMonth = () => {

    const month = getMonth(new Date());

    return (
        <div>
            <p>{month}</p>
            <div>
                
            </div>
        </div>
    )
}