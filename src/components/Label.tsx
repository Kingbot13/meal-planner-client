
export const Label = ({text, htmlFor}: {text: string, htmlFor: string}) => {

    return <label className="font-bold text-primary-text -m-3" htmlFor={htmlFor} >{text}</label>
}