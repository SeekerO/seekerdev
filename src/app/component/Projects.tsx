"use client"

import Image from "next/image";
import React, { useState, useRef } from "react";
import Modalproject from "./util/modal/Modalproject";
import {
    iMonitor,
    Send_here,
    Akira,
    Seekerdev,
    Todo,
    trackit,
    foodsearchy,
    uptomovie,
} from "./images/images";
import proejct_data from "./util/json/json_projects.json";
import IconSorter from "./util/icon/IconSorter";
import { motion, useInView } from "framer-motion";

const Projects = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [item, setItem] = useState<any>([]);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const [allProjectData, setAllProjectData] = useState(proejct_data.projects);

    const handleCloseModal = () => {
        setOpen(!open)
    }

    const setImages = (imageName: string) => {
        const imagesMap: any = {
            iMonitor,
            Send_here,
            Akira,
            Seekerdev,
            Todo,
            trackit,
            foodsearchy,
            uptomovie,
        };
        return imagesMap[imageName] || null;
    };

    const openItem = (item: any) => {
        setOpen(!open)
        setItem(item)
    }

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
        <div className="min-h-screen w-full pt-30">
            <h1 className="font-bold text-3xl tracking-wider text-center">PROJECTS</h1>

            <motion.div
                className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 px-10 lg:px-0 gap-7 mt-8 mb-10 "
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {allProjectData.map((item: any, index: number) => (
                    <motion.div
                        key={index}
                        onClick={() => openItem(item)}
                        className="flex flex-col shadow-md shadow-slate-900 rounded-lg gap-9 px-3 py-4 border-1 border-[#013e3b] relative group hover:scale-110 duration-300 cursor-pointer z-0"
                        variants={itemVariants}
                    >
                        <div
                            className={`${item.status.includes("online")
                                ? "text-green-500"
                                : `${item.status.includes("maintenance", "Under Development")
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`
                                } uppercase text-[10px] font-normal bg-slate-700 w-fit px-3 py-0.5 left-1.5 top-2 flex gap-1 text-center absolute border-[5px] border-[#0C1618] rounded-full z-10`}
                        >
                            {item.status}
                        </div>
                        <div className="rounded-md w-full ">
                            <Image
                                src={setImages(item.src)}
                                alt={item.title}
                                className="w-full h-full rounded-md duration-300 border-gray-700 border-2  object-contain relative z-0"
                            />
                        </div>
                        <div className="flex flex-col justify-between h-[200px]">
                            <div>
                                <h1 className="font-medium text-2xl">{item.title}</h1>
                                <p className="text-slate-400 ">{item.discrp}</p>
                            </div>
                            <div className="flex gap-1 w-full items-center ">
                                {Array.isArray(item?.subtitle) &&
                                    item.subtitle.map((item1: string, index: number) => (
                                        <label key={index} className="h-5 w-5"> <IconSorter name={item1} /></label>
                                    ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <Modalproject open={open} close={handleCloseModal} item={item} />
        </div>
    );
};

export default Projects;

//OPEN LINK SITE
{/* <button onClick={() =>
                            openLink(
                                item.href,
                                item.id,
                                item.allowToOpenSite
                            )
                        }>VIEW SITE</button> */}

//OPEN LINK SITE BY IMAGE
{/* <Image
    // onClick={() =>
    //     item.allowToOpenSite &&
    //     window.open(item.href, "")
    // }
    src={setImages(item.src)}
    alt={item.title}
    className="w-full h-full rounded-md duration-300 border-gray-700 border-2  object-contain"
/> */}