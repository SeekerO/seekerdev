import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"
import IconSorter from "./icon/IconSorter";

// Updated the interface to correctly define prop types.
interface ProjectCardType {
    index: number;
    item: any;
    openItem: (item: any) => void;
    // setImages should likely be a function that returns a string, not a boolean
    setImages: (src: string) => string;
    itemVariants: any;
}

const ProjectCard = ({ item, index, openItem, setImages, itemVariants }: ProjectCardType) => {
    return (
        <motion.div
            key={index}
            onClick={() => openItem(item)}
            className="relative flex flex-col shadow-md shadow-gray-900 rounded-lg gap-7 p-4 border-[1px] border-[#013e3b] group hover:scale-95 hover:shadow-inner duration-300 cursor-pointer w-full items-start"
            variants={itemVariants}
        >
            {/* The status badge is placed correctly inside the container */}
            <div className="absolute top-0 -translate-y-1/2 left-3 z-10 rounded-full border-[#013e3b] border-[1px]">
                <div
                    className={`${item.status.includes("online")
                        ? "text-green-500"
                        : `${item.status.includes("maintenance") || item.status.includes("Under Development")
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`
                        } uppercase text-[10px] font-normal bg-slate-700 w-fit px-3 py-0.5 flex gap-1 text-center border-[3px] border-[#0C1618] rounded-full`}
                >
                    {item.status}
                </div>
            </div>

            <div className="rounded-md w-full mt-4">
                <Image
                    src={setImages(item.src)}
                    alt={item.title}
                    className="rounded-md duration-300 border-[#013e3b] border-[1px] object-contain w-full"
                />
            </div>
            <div className="flex flex-col justify-between h-[200px] overflow-hidden">
                <div>
                    <h1 className="font-medium text-2xl">{item.title}</h1>
                    <p className="text-slate-400 break-words">{item.discrp}</p>
                </div>
                <div className="flex gap-1 w-full items-center pt-4">
                    {Array.isArray(item?.subtitle) &&
                        item.subtitle.map((item1: string, index: number) => (
                            <label key={index} className="h-6 w-6"> <IconSorter name={item1} /></label>
                        ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;