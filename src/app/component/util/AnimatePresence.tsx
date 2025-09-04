import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface WordAnimatorProps {
    words: string[];
}

const WordAnimator = ({ words }: WordAnimatorProps) => {
    const [wordIndex, setWordIndex] = useState(0);

    const currentWord = words[wordIndex];
    const nextWordIndex = (wordIndex + 1) % words.length;
    const nextWord = words[nextWordIndex];

    const handleHover = () => {
        // Only proceed if there are words to animate
        if (words.length > 1) {
            setWordIndex(nextWordIndex);
        }
    };

    const containerVariants = {
        initial: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        animate: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const letterVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
    };

    return (
        <div className="inline-block relative overflow-hidden -mb-2" onMouseEnter={handleHover}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentWord}
                    className="whitespace-nowrap flex"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {currentWord.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default WordAnimator;