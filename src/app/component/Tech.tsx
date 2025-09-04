"use client"

import React, { useRef } from "react";
import IconSorter from "./util/icon/IconSorter";
import { motion, useInView } from "framer-motion";

const Tech = () => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const languages = [
        { type: "JAVASCRIPT" },
        { type: "TYPESCRIPT" },
        { type: "JAVA" },
        { type: "JQUERY" },
        { type: "C-Sharp" },
        { type: "PYTHON" },
        { type: "CSS3" },
        { type: "HTML5" },
    ];

    const libraries = [
        { type: "REACT.JS" },
        { type: "NODE.JS" },
        { type: "NEXT.JS" },
        { type: "VITE.JS" },
        { type: "SVELTE" },
        { type: "TAILWIND" },
        { type: "FIGMA" },
        { type: "NPM" }
    ];

    const cms = [
        { type: "WORDPRESS" },
        { type: "ELEMENTOR" },
        { type: "SUPABASE" },
        { type: "FIREBASE" },
        { type: "MONGO DB" },
        { type: "mySQL" },
    ];

    // Variants for the staggered animation
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Variants for each individual item
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="lg:px-40 px-10 min-h-screen w-full flex flex-col items-center pt-33 mb-10 z-0">
            <h1 className="textColor text-3xl font-bold tracking-widest">TECH-STACKS</h1>

            <motion.div
                className="grid mt-8 w-full justify-center text-center  lg:text-start"
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <>
                    <h1 className="font-semibold pb-3 text-lg italic px-3">Programming Languages and Frontend Technologies</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-5">
                        {languages.map((meta_data, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex flex-col items-center group relative hover:scale-115 duration-300 z-0"
                            >
                                <div className="icon w-fit mr-1 flex-shrink-0 rounded-full items-center flex justify-center">
                                    <label className="w-13 h-13">{<IconSorter name={meta_data.type} />}</label>
                                </div>
                                <label className="textColor font-thin mt-1 flex justify-center flex-wrap text-clip">
                                    {meta_data.type}
                                </label>
                            </motion.div>
                        ))}
                    </div>
                </>

                <>
                    <h1 className="font-semibold pb-3 text-lg mt-10 italic">Frameworks and Libraries</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                        {libraries.map((meta_data, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex flex-col items-center group relative hover:scale-115 duration-300 z-0"
                            >
                                <div className="icon w-fit mr-1 flex-shrink-0 rounded-full items-center flex justify-center">
                                    <label className="w-13 h-13">{<IconSorter name={meta_data.type} />}</label>
                                </div>
                                <label className="textColor font-thin mt-1 flex justify-center flex-wrap text-clip">
                                    {meta_data.type}
                                </label>
                            </motion.div>
                        ))}
                    </div>
                </>

                <>
                    <h1 className="font-semibold pb-3 text-lg mt-10 italic">CMS and Databases</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                        {cms.map((meta_data, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex flex-col items-center group relative hover:scale-115 duration-300 z-0"
                            >
                                <div className="icon w-fit mr-1 flex-shrink-0 rounded-full items-center flex justify-center">
                                    <label className="w-13 h-13">{<IconSorter name={meta_data.type} />}</label>
                                </div>
                                <label className="textColor font-thin mt-1 flex justify-center flex-wrap text-clip">
                                    {meta_data.type}
                                </label>
                            </motion.div>
                        ))}
                    </div>
                </>
            </motion.div>
        </div>
    );
};

export default Tech;