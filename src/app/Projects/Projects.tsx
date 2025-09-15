"use client"

import Image from "next/image";
import React, { useState, useRef } from "react";
import Modalproject from "../component/modal/Modalproject";
import {
    iMonitor,
    Send_here,
    Akira,
    Seekerdev,
    Todo,
    trackit,
    foodsearchy,
    uptomovie,
} from "../component/images/images";
import proejct_data from "../component/util/json/json_projects.json";
import IconSorter from "../component/util/icon/IconSorter";
import { motion, useInView } from "framer-motion";
import ProjectCard from "../component/util/ProjectCard";

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
                className="max-w-5xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 lg:px-0 gap-5 mt-8 mb-10 "
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {allProjectData.map((item: any, index: number) => (
                    <ProjectCard key={index} item={item} index={index} openItem={openItem} setImages={setImages} itemVariants={itemVariants} />
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