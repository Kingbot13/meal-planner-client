import {Bars3Icon} from '@heroicons/react/24/outline'
import React, { useEffect, useRef } from 'react'

export const Nav = () => {

    const svgRef = useRef<SVGSVGElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        if (divRef.current) {
            if (!divRef.current.classList.contains('hamburger-active')) divRef.current.classList.add('hamburger-active');
            else divRef.current.classList.remove('hamburger-active');
        }

    }
    return (
        <nav className="rounded-full absolute -right-40 -top-40 w-80 h-80 bg-bubble-gum overflow-hidden ">
            {/* <Bars3Icon className='absolute top-44 h-16 z-10 w-16 left-16 stroke-[#fff] transition-transform target:-rotate-90 '/> */}
            <div ref={divRef} onClick={(e) => handleClick(e)} tabIndex={0} className='absolute  hamburger top-44 left-16'>
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" h-16 transition-transform focus:-rotate-90 w-16 stroke-[#fff] ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>


        </nav>
    )
}

