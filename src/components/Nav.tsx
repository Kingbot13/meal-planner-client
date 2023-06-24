import {Bars3Icon} from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';

export const Nav = () => {
    const [isClicked, setIsClicked] = useState(false);

    const {userId} = useParams();

    const handleClick = () => {
        setIsClicked(!isClicked ? true: false);
    }

    return (
        <nav className="rounded-full absolute -right-40 -top-40 w-80 h-80 bg-bubble-gum overflow-hidden flex justify-center items-center ">
            <div onClick={handleClick} tabIndex={0} className={`absolute ${isClicked ? 'hamburger-active' : 'hamburger'} top-44 left-16`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" h-16 transition-transform focus:-rotate-90 w-16 stroke-[#fff] ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <NavLink style={{"--deg": '-25deg', translate: isClicked ? '-20rem' : 0} as React.CSSProperties} className={`rotate-[var(--deg)] transition-transform `} to={`/user/${userId}/recipes`} >Recipes</NavLink>


        </nav>
    )
}

