import { PropsWithChildren, ReactNode } from "react"

interface propTypes {
    color: string,
    children: ReactNode,
    tabTop: string,
    title: string
}


export const FolderTab = (props: propTypes) => {
    return (
        <div className={`flex w-[80rem] h-[40rem] relative self-start rounded-r-md bg-${props.color} items-center justify-center`} >
            <p className={`bg-${props.color} w-24 h-9 text-white rotate-90 -right-14 top-${props.tabTop} rounded-t-md absolute`} >{props.title}</p>
            <div className="bg-white w-5/6 h-5/6">
                {props.children}
            </div>
        </div>
    )
}