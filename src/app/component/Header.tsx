"use client";

import React, { useState } from "react";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import Modalcontact from "./util/modal/Modalcontact";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import WordAnimator from "./util/AnimatePresence";

const Header = ({
    scrollToHero,
    scrollToAbout,
    scrollToProjects,
    scrollToTechStack,
    handleOpenContacts,
}: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    // This hook listens to scroll events and updates the 'hidden' state
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 100) {
            setHidden(true); // Scroll down
        } else {
            setHidden(false); // Scroll up
        }
    });

    const handleOpenModal = () => {
        setOpen(!open);
    };

    const greetings = [
        "DEV",
        "Hola",
        "Bonjour",
        "Guten tag",
        "Ciao",
        "Konnichiwa",
        "Annyeonghaseyo",
        "Zdravstvuyte",
        "Marhaban",
        "Namaste",
        "Olá",
        "Kumusta",
        "Hej",
        "Aloha",
        "Kia ora",
        "Jambo"
    ];

    return (
        <>
            <Modalcontact open={open} close={handleOpenModal} />
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-[80%] max-w-5xl xl:w-[65%] font-raleway headerColor textColor px-4 py-3 rounded-full flex xl:justify-between justify-center items-center font-bold backdrop-blur-[3px] fixed top-4 z-40 "
            >
                <h1 className=" tracking-[4.5px] text-[1.3rem] font-extrabold px-3 cursor-default items-center relative">
                    SEEKER
                    <span className="font-medium text-lg font-raleway">{`{`}<WordAnimator words={greetings} />{`}`}</span>
                </h1>


                <div className="hidden xl:flex gap-5 items-center tracking-wider font-medium ">
                    <button
                        onClick={scrollToHero}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300"
                    >
                        HOME
                    </button>

                    <button
                        onClick={scrollToTechStack}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300"
                    >
                        TECH-STACKS
                    </button>

                    <button
                        onClick={scrollToProjects}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300"
                    >
                        PROJECTS
                    </button>

                    <button
                        onClick={scrollToAbout}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300"
                    >
                        ABOUT
                    </button>
                    <div className="mainColor p-2 px-6 rounded-full hover:scale-105 hover:text-blue-300 transition-transform duration-300 ease-in-out cursor-pointer group">
                        <button
                            onClick={handleOpenContacts}
                            className="cursor-pointer flex items-center gap-2.5"
                        >
                            CONTACT ME
                            <FaEnvelope size={15} className="group-hover:hidden" />
                            <FaEnvelopeOpen size={15} className="group-hover:flex hidden" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Header;