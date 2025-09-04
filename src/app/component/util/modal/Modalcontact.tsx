"use client"

import React, { useRef, useEffect, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Letter {
    name: string,
    email: string,
    phonenumber: string,
    subject: string,
    message: string,
}

interface StatusMessage {
    text: string;
    type: 'success' | 'error';
}

const Modalcontact = ({ open, close }: { open: boolean, close: () => void }) => {
    const [letter, setLetter] = useState<Letter>({ name: "", email: "", phonenumber: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
    const [lastSubmission, setLastSubmission] = useState<number | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            close();
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            const storedTime = localStorage.getItem('lastEmailSubmission');
            if (storedTime) {
                setLastSubmission(parseInt(storedTime, 10));
            }
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, close]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLetter(prevLetter => ({
            ...prevLetter,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage(null);

        const currentTime = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000;

        if (lastSubmission && (currentTime - lastSubmission) < fiveMinutes) {
            const timeLeft = Math.ceil((fiveMinutes - (currentTime - lastSubmission)) / 1000);
            setStatusMessage({
                text: `Please wait ${Math.floor(timeLeft / 60)} minutes and ${timeLeft % 60} seconds before sending another email. You can message me on Facebook instead!`,
                type: 'error'
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(letter),
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMessage({ text: 'Email sent successfully!', type: 'success' });
                setLetter({ name: "", email: "", phonenumber: "", subject: "", message: "" });
                const newSubmissionTime = new Date().getTime();
                setLastSubmission(newSubmissionTime);
                localStorage.setItem('lastEmailSubmission', newSubmissionTime.toString());
            } else {
                setStatusMessage({ text: data.error || 'Failed to send email.', type: 'error' });
            }
        } catch (error) {
            setStatusMessage({ text: 'An unexpected error occurred.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Use AnimatePresence to handle the mount/unmount of the modal
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 h-screen w-screen z-40 justify-center items-center flex bg-black/30 duration-300">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key="box"
                        className="h-auto max-h-[95%] w-11/12 md:h-[99%] md:w-[50%] bg-[#0C1618] shadow-md shadow-slate-950 rounded-md p-6 md:p-8 flex flex-col overflow-x-auto"
                    >
                        <div className="mb-5">
                            <h1 className="text-3xl font-semibold uppercase">Contact Me</h1>
                            <p className="font-thin italic text-slate-300 pt-0.5">Let's talk about your dream project and make it a reality!</p>
                        </div>
                        <form onSubmit={handleSubmit} className=" flex flex-col flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3">
                                {/* NAME */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-white" htmlFor="name">Your Name</label>
                                    <input
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={letter.name}
                                        onChange={handleChange}
                                        className="border border-[#004643] outline-none px-2 py-3 rounded-md bg-transparent text-white"
                                        placeholder="ex. John Doe"
                                    />
                                </div>
                                {/* EMAIL */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-white" htmlFor="email">Your Email</label>
                                    <input
                                        required
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={letter.email}
                                        onChange={handleChange}
                                        className="border border-[#004643] outline-none px-2 py-3 rounded-md bg-transparent text-white"
                                        placeholder="ex. johndoe@gmail.com"
                                    />
                                </div>
                                {/* PHONE NUMBER */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-white" htmlFor="phonenumber">Phone Number</label>
                                    <input
                                        required
                                        id="phonenumber"
                                        name="phonenumber"
                                        type="tel"
                                        value={letter.phonenumber}
                                        onChange={handleChange}
                                        className="border border-[#004643] outline-none px-2 py-3 rounded-md bg-transparent text-white"
                                        placeholder="ex. 123-456-7890"
                                    />
                                </div>
                                {/* Subject */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-white" htmlFor="subject">Subject</label>
                                    <input
                                        required
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={letter.subject}
                                        onChange={handleChange}
                                        className="border border-[#004643] outline-none px-2 py-3 rounded-md bg-transparent text-white"
                                        placeholder="ex. Project Inquiry"
                                    />
                                </div>
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                rows={10}
                                value={letter.message}
                                onChange={handleChange}
                                placeholder="Enter message here..."
                                className="outline-none border border-[#004643] w-full mt-3 p-2 rounded-md flex-1 bg-transparent text-white"
                            />
                            {statusMessage && (
                                <div className={`mt-2 p-3 rounded-md ${statusMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white text-center`}>
                                    {statusMessage.text}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-[#004643] text-white rounded-md font-semibold hover:bg-opacity-80 transition-colors cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modalcontact;