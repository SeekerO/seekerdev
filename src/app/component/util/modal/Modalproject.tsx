"use client"

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import IconSorter from "../icon/IconSorter";
import { FaTimes, FaGlobe } from "react-icons/fa";

// Assume these are the image imports, similar to your Projects.tsx file
// You will need to import your actual project images here
import {
    iMonitor,
    Send_here,
    Akira,
    Seekerdev,
    Todo,
    trackit,
    foodsearchy,
    uptomovie,
} from "../../images/images";

const Modalproject = ({ open, close, item }: { open: boolean, close: () => void, item: any }) => {

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            close();
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, close]);

    // Function to get the correct image based on the image name in the JSON
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

    // Prepare gallery images
    const galleryItems = Object.keys(item).reduce((acc: any, key) => {
        if (key.startsWith('pic') || key === 'main') {
            acc.push(item[key]);
        }
        return acc;
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <div
                    className="h-screen w-screen fixed inset-0 flex justify-end backdrop-blur-[2px] bg-black/70 z-50"
                    onClick={close} // Simplified a bit, but handleClickOutside is more robust
                >
                    <motion.div
                        ref={ref}
                        initial={{ x: '100%' }} // Starts from outside the right
                        animate={{ x: '0%' }} // Slides to its position
                        exit={{ x: '100%' }} // Slides back out to the right
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-full md:w-[60%] lg:w-[45%] h-full bg-[#0C1618] shadow-md shadow-slate-950 p-6 flex flex-col relative overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        {/* Main Image and Title */}
                        <div className="flex flex-col items-center gap-4">
                            <Image
                                src={setImages(item.src)}
                                alt={item.title}
                                className="w-full rounded-lg shadow-lg object-contain"
                            />
                            <div className="flex flex-col items-center text-center mt-4">
                                <h1 className="text-3xl font-bold text-white">{item.title}</h1>
                                <p className="text-sm font-thin italic text-slate-400">{item.discrp}</p>
                            </div>
                        </div>

                        {/* Tech Stack Icons */}
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-white mb-2">Tech Stack</h2>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {Array.isArray(item.subtitle) &&
                                    item.subtitle.map((tech: string, index: number) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className="w-10 h-10 text-white">
                                                <IconSorter name={tech} />
                                            </div>
                                            <span className="text-xs text-slate-400 mt-1">{tech}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Status and Link Button */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-4">
                            <div
                                className={`uppercase text-xs font-bold px-4 py-1 rounded-full border ${item.status === "online" ? "text-green-400 border-green-400" : "text-yellow-400 border-yellow-400"
                                    }`}
                            >
                                {item.status}
                            </div>
                            {item.allowToOpenSite && (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-[#004643] text-white rounded-md font-semibold hover:bg-opacity-80 transition-colors"
                                >
                                    <FaGlobe />
                                    View Site
                                </a>
                            )}
                        </div>

                        {/* Project Gallery */}
                        {/* <div className="mt-10">
                            <h2 className="text-lg font-semibold text-white mb-4">Project Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {galleryItems.map((pic: any, index: number) => (
                                    pic.src && (
                                        <div key={index} className="flex flex-col items-center">
                                            <Image
                                                src={setImages(pic.src)}
                                                alt={pic.title || `Project Image ${index}`}
                                                className="w-full rounded-md shadow-lg"
                                            />
                                            {pic.title && (
                                                <p className="mt-2 text-white font-medium text-center">{pic.title}</p>
                                            )}
                                            {pic.disc && (
                                                <p className="text-xs text-slate-400 text-center">{pic.disc}</p>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div> */}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modalproject;