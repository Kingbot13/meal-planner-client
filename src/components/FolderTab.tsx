import { ReactNode } from "react"

interface propTypes {
    color: string,
    children: ReactNode,
    tabTop: string,
    title: string,
    zIndex: string
}


export const FolderTab = (props: propTypes) => {
    return (
        <div className={`flex overflow-y-scroll ${props.zIndex} lg:w-[80rem] lg:h-[40rem] w-11/12 h-5/6 absolute self-start rounded-r-md ${props.color} items-center justify-center`} >
            <p className={`${props.color} w-24 h-9 text-white rotate-90 -right-14 ${props.tabTop} rounded-t-md absolute`} >{props.title}</p>
            <div className="bg-white w-5/6 h-5/6">
                {props.children}
            </div>
        </div>
    )
}