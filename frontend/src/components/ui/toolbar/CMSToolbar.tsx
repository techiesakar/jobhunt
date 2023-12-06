"use client"
import { cmsNavData } from '@/data/cmsNavData'
import React, { useEffect, useState } from 'react'
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link'
import Branding from '@/components/Branding';

const CMSToolbar = () => {
    const [headerPosition, setHeaderPosition] = useState("")
    useEffect(() => {
        const scrollPosition = () => {
            const scrollYPosition = window.scrollY; // Added type annotation
            scrollYPosition >= 100 ? setHeaderPosition("scrolled") : setHeaderPosition("")
        }
        window.addEventListener("scroll", scrollPosition)
        return () => {
            window.removeEventListener("scroll", scrollPosition)
        }
    }, []);



    return <header className={`border-b sticky dark:bg-gray-900  inset-x-0 z-50 bg-white border-gray-200 dark:border-gray-600 h-16 flex items-center ${headerPosition}`}>
        <div className="flexBetween huntContainer h-full">
            <Branding />
            <div className="flexBetween gap-8 h-full">
                {/* @ts-ignore */}
                <Menubar>
                    {cmsNavData.map((item, index) => (
                        <MenubarMenu key={index}>
                            {/* @ts-ignore */}
                            <MenubarTrigger>
                                <Link className='capitalize' href={item.link}>{item.title}</Link>
                            </MenubarTrigger>
                        </MenubarMenu>
                    ))}
                </Menubar>
            </div>
        </div>
    </header>
}

export default CMSToolbar;
