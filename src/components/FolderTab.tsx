import { PropsWithChildren, ReactNode } from "react"

interface propTypes {
    color: string,
    children: ReactNode,
    tabTop: number,
    title: string
}


export const FolderTab = (props: propTypes) => {
    return (
        <div className={`flex lg:w-[80rem] lg:h-[40rem] w-11/12 h-5/6 relative self-start rounded-r-md bg-${props.color} items-center justify-center`} >
            <p className={`bg-${props.color} w-24 h-9 text-white rotate-90 -right-14 top-${props.tabTop} rounded-t-md absolute`} >{props.title}</p>
            <div className="bg-white w-5/6 h-5/6">
                {props.children}
            </div>
        </div>
    )
}