
export const SubmitButton = ({text, onClick}: {text: string, onClick: () => void}) => {
    return <button className="text-white w-32 h-12 bg-warmth rounded-lg" type="button" onClick={()=>onClick()}>{text}</button>
}