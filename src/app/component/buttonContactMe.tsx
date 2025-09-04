"use client"

import React, { useState } from "react";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import Modalcontact from "./util/modal/Modalcontact";


interface ContactMeType {
    handleOpenContacts: () => void;
}

const ButtonContactMe = ({ handleOpenContacts }: ContactMeType) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
        setOpen(!open);
    };

    return <>

        <div className="mainColor p-2 px-6 rounded-full hover:scale-105 hover:text-blue-300 transition-transform duration-300 ease-in-out cursor-pointer active:scale-90 ">
            <button
                onClick={handleOpenContacts}
                className="cursor-pointer flex items-center gap-2.5 click:scale-80"
            >
                CONTACT ME
                <FaEnvelope size={15} className="group-hover:hidden" />
                <FaEnvelopeOpen size={15} className="group-hover:flex hidden" />
            </button>
        </div>

        <Modalcontact open={open} close={handleOpenModal} />

    </>;
};

export default ButtonContactMe;
