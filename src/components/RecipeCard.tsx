// this component could contain small key bits of information such as cooking time
import { guestUtils } from "../app/guestUtils";

export const RecipeCard = (recipeName: string, id: string) => {
    const {isGuest} = guestUtils;
    return (
        <li>
            <div>
                <div>{recipeName}</div>
                <button type="button" data-id={isGuest ? recipeName : id}>Update</button>
                <button type="button">Delete</button>
            </div>
        </li>
    )
}