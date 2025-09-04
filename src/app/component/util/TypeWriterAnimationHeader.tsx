import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const TypewriterAnimation = ({ typewriterText }: { typewriterText: string[] | "" }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        let ticker = setInterval(() => {
            handleType();
        }, typingSpeed);

        return () => clearInterval(ticker);
    }, [text]); // Re-run effect when `text` changes

    const handleType = () => {
        const i = loopNum % typewriterText.length;
        const fullText = typewriterText[i];

        // Determine the text to display based on whether we are deleting or typing
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        // If we are deleting, increase speed. If typing, slow down.
        if (isDeleting) {
            setTypingSpeed(prevSpeed => prevSpeed / 2);
        }

        // Check if the current full text has been fully typed
        if (!isDeleting && updatedText === fullText) {
            setTypingSpeed(500); // Pause at the end
            setIsDeleting(true);
        }
        // Check if the text is fully deleted
        else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(300); // Resume typing speed
        }
    };

    return (
        <motion.div
            className="tracking-[3.5px] cursor-default"
        >
            {text}
            <motion.span
                className="inline-block w-[3px] h-[1.3rem] "
                style={{ backgroundColor: '#FAF4D3' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
    );
};

export default TypewriterAnimation;