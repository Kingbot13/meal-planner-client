import { PropsWithChildren, ReactNode } from "react"

interface propTypes {
    color: string,
    children: ReactNode
}


export const FolderTab = (props: propTypes) => {
    return (
        <div className={`flex w-[80rem] h-[40rem] bg-${props.color}`} >
            {props.children}
        </div>
    )
}