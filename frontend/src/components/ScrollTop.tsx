"use client"
import React, { useMemo, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'


const ScrollTop = () => {
    const [show, setShow] = useState(false)

    const scrollPosition = () => {
        scrollY > 100 ? setShow(true) : setShow(false)
    }

    useMemo(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", scrollPosition)
        }
    }, [])

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <button onClick={scrollToTop}
                className={`fixed ease-linear bottom-8 right-10 p-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-full text-white  ${!show && "hidden"}`}><AiOutlineArrowUp /></button>
        </div>)
}

export default ScrollTop