import React, { ReactNode } from "react"

interface propTypes {
    color: string,
    children: ReactNode,
    tabTop: string,
    title: string,
    zIndex: string
}


export const FolderTab = (props: propTypes) => {

    const activeFolder = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const active = document.querySelector('.folder-active');
        active?.classList.remove('folder-active');
        const parent = (e.target as Element).parentNode;
        if (parent && !(parent as Element).classList.contains('folder-active')) {
            (parent as Element).classList.add('folder-active');
        }
    }
    return (
        <div data-testid={`ft-${props.title}`} className={`flex folder ${props.zIndex} lg:w-[80rem] lg:h-[40rem] w-11/12 h-5/6 absolute self-start rounded-r-md ${props.color} items-center justify-center`} >
            <p onClick={(e) => activeFolder(e)} className={`${props.color} w-24 h-9 text-white rotate-90 -right-14 ${props.tabTop} rounded-t-md absolute`} >{props.title}</p>
            <div className="bg-white w-5/6 h-5/6">
                {props.children}
            </div>
        </div>
    )
}