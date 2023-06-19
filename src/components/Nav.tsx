import {Bars3Icon} from '@heroicons/react/24/outline'
import React, { useEffect, useRef } from 'react'

export const Nav = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    // useEffect(() => {
    //     if (svgRef.current) {
    //         svgRef.current.focus();
    //     }
    // },[]);

    const handleClick = (e: React.MouseEvent) => {
        if (svgRef.current) {
            svgRef.current.focus();
        }

        console.log(e.target);
    }
    return (
        <nav className="rounded-full absolute -right-40 -top-40 w-80 h-80 bg-bubble-gum overflow-hidden ">
            {/* <Bars3Icon className='absolute top-44 h-16 z-10 w-16 left-16 stroke-[#fff] transition-transform target:-rotate-90 '/> */}
            <div tabIndex={0} onClick={(e) => handleClick(e)} className='absolute hamburger top-44 left-16'>
                <svg ref={svgRef} onClick={(e) => handleClick(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" h-16 w-16 stroke-[#fff] ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>


        </nav>
    )
}

