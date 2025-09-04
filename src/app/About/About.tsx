"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
    // Create a ref to attach to the main container
    const ref = useRef(null);
    // Use the useInView hook to check if the component is visible.
    // The 'once: true' option ensures the animation only plays the first time.
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Variants for the staggered animation of the entire section
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.25 // Delay between each child element's animation
            }
        }
    };

    // Variants for each individual text element (h1 and p)
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="w-[90%] max-w-5xl textColor flex flex-col items-center gap-10 px-10"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.h1 className="font-bold text-3xl" variants={itemVariants}>
                ABOUT
            </motion.h1>

            <div className="text-justify flex flex-col gap-4">
                <motion.p variants={itemVariants}>
                    Hello! My name is <strong className="font-semibold">John</strong>, but you can call me <strong className="font-semibold">Albert</strong> if
                    you like. I have a bachelor's degree in information technology and have
                    adequate experience to build websites. My experience encompasses all
                    aspects of website development, having worked with multiple tech stacks
                    that is listed above. Programming on the front and
                    back ends is my area of expertise.
                </motion.p>

                <motion.p variants={itemVariants}>
                    I approach every assignment with a collaborative mindset and good
                    problem-solving skills in addition to my technical expertise. Working
                    together with cross-functional teams to fully understand project needs
                    and deliver exceptional solutions is something I enjoy doing. I'm
                    committed to offering excellent software solutions that support business
                    success, and I'm also committed to lifetime learning and staying up to
                    date with current market trends.  {`{ }`}
                </motion.p>
            </div>
        </motion.div>
    );
};

export default About;