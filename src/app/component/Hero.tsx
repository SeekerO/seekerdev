import React from "react";
import { FaFacebook, FaDiscord, FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import TypewriterAnimation from "./util/TypeWriterAnimationHeader";
import Profile from "./Profile";
const Hero = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Delay between each child's animation
                when: "beforeChildren", // Parent animation starts before children
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const typewriterText = [
        "Front-End Developer",
        "Back-End Developer",
        "Sleeper",
    ];

    const handleOpenSocMed = (href: string) => {
        window.open(href)
    }

    return (
        <motion.div
            className="flex flex-col lg:flex-row items-center justify-center p-8 gap-10 min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >


            <motion.div
                className="flex flex-col items-center relative group"
                variants={itemVariants}
            >
                <Profile />
            </motion.div>
            {/* Update */}

            <motion.div
                className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left"
                variants={containerVariants}
            >
                <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF4D3]" variants={itemVariants}>
                    John Albert Baisa
                </motion.h1>

                <motion.div className="text-xl sm:text-2xl font-raleway italic font-medium  text-[#FAF4D3]" variants={itemVariants}>
                    <TypewriterAnimation typewriterText={typewriterText} />
                </motion.div>

                <motion.p className="max-w-full sm:max-w-sm lg:max-w-2xl text-xl text-gray-300 italic font-light font-raleway" variants={itemVariants}>
                    {`"Learn until you make it; stopping was never an option in the first place."`}
                </motion.p>

                <motion.div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mt-4" variants={containerVariants}>
                    <motion.button onClick={() => handleOpenSocMed("https://www.facebook.com/baisa001")} className="flex gap-1 tracking-wide items-center text-lg text-gray-400 hover:text-blue-400 duration-300 cursor-pointer" variants={itemVariants}>
                        <FaFacebook />
                        Facebook
                    </motion.button>
                    <motion.button onClick={() => handleOpenSocMed("https://github.com/SeekerO")} className="flex gap-1 tracking-wide items-center text-lg text-gray-400 hover:text-blue-400 duration-300 cursor-pointer" variants={itemVariants}>
                        <FaGithub />
                        Github
                    </motion.button>
                    <motion.a onClick={() => handleOpenSocMed("https://www.linkedin.com/in/john-albert-baisa-a40041273/")} className="flex gap-1 tracking-wide items-center text-lg text-gray-400 hover:text-blue-400 duration-300 cursor-pointer" variants={itemVariants}>
                        <FaLinkedin />
                        LinkedIn
                    </motion.a>
                    <motion.a onClick={() => handleOpenSocMed("https://discordapp.com/users/405593735532118026")} className="flex gap-1 tracking-wide items-center text-lg text-gray-400 hover:text-blue-400 duration-300 cursor-pointer" variants={itemVariants}>
                        <FaDiscord />
                        Discord
                    </motion.a>
                </motion.div>


            </motion.div>
        </motion.div>
    );
};

export default Hero;