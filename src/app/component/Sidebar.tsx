"use client"

import React, { useRef, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import { AnimatePresence, motion } from "framer-motion";

interface SidebarProps {
    scrollToHero: () => void;
    scrollToProjects: () => void;
    scrollToTechStack: () => void;
    scrollToAbout: () => void;
    handleOpenContacts: () => void;
    openSidebar: boolean;
    handleOpenSidebar: () => void
}

const Sidebar = ({ scrollToHero, scrollToProjects, scrollToTechStack, scrollToAbout, handleOpenContacts, handleOpenSidebar, openSidebar }: SidebarProps) => {

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            handleOpenSidebar();
        }
    };

    useEffect(() => {
        if (openSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSidebar, handleOpenSidebar]);

    return (
        <>
            <div className="h-15 w-15 flex items-center justify-center">
                <button onClick={handleOpenSidebar}>
                    <FaBars />
                </button>
            </div>

            <AnimatePresence>
                {openSidebar && (
                    <div className="fixed inset-0 h-full w-screen z-50 bg-black/50 backdrop-blur-[2px]">
                        <motion.div
                            ref={ref}
                            initial={{ x: '-100%' }} // Start from outside the left side of the screen
                            animate={{ x: '0%' }}   // Slide to the right
                            exit={{ x: '-100%' }}   // Slide back out to the left
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="w-[50%] h-full shadow-md shadow-slate-900 bg-[#0C1618] p-10 justify-center flex flex-col gap-5"
                        >
                            <button onClick={() => { scrollToHero(); handleOpenSidebar(); }}>HOME</button>
                            <button onClick={() => { scrollToTechStack(); handleOpenSidebar(); }}>TECHSTACK</button>
                            <button onClick={() => { scrollToProjects(); handleOpenSidebar(); }}>PROJECTS</button>
                            <button onClick={() => { scrollToAbout(); handleOpenSidebar(); }}>ABOUT</button>
                            <button onClick={handleOpenContacts}>CONTACT ME</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;