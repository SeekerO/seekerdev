"use client";

import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import WordAnimator from "../component/util/AnimatePresence";
import ButtonContactMe from "../component/buttonContactMe";

const Header = ({
    scrollToHero,
    scrollToAbout,
    scrollToProjects,
    scrollToTechStack,
    handleOpenContacts,
    isUserScrolling
}: any) => {

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


            <motion.div
                variants={{
                    visible: { y: 18 },
                    hidden: { y: "-200%" },
                }}
                animate={isUserScrolling ? "hidden" : "visible"}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`w-[80%] max-w-5xl xl:w-[65%] font-raleway headerColor textColor px-4 py-3 rounded-full flex xl:justify-between justify-center items-center font-bold backdrop-blur-[3px] fixed top-0 z-40 $duration-300 transition-transform`}
            >
                <h1 className=" tracking-[4.5px] text-[1.3rem] font-extrabold px-3 cursor-default items-center relative">
                    SEEKER
                    <span className="font-medium text-lg font-raleway">{`{`}<WordAnimator words={greetings} />{`}`}</span>
                </h1>


                <div className="hidden xl:flex gap-5 items-center tracking-wider font-medium ">
                    <button
                        onClick={scrollToHero}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300 active:scale-80"
                    >
                        HOME
                    </button>

                    <button
                        onClick={scrollToTechStack}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300 active:scale-80"
                    >
                        TECH-STACKS
                    </button>

                    <button
                        onClick={scrollToProjects}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300 active:scale-80"
                    >
                        PROJECTS
                    </button>

                    <button
                        onClick={scrollToAbout}
                        className="cursor-pointer hover:tracking-widest hover:text-blue-300 duration-300 active:scale-80"
                    >
                        ABOUT
                    </button>
                    <ButtonContactMe handleOpenContacts={handleOpenContacts} />
                </div>
            </motion.div>
        </>
    );
};

export default Header;