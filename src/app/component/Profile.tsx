import React, { useState } from "react";
import { motion } from "framer-motion"
import cat from "./util/json/cat Mark loading.json"
import LottiePlayer from "./util/LottiePlayer";
const Profile = () => {

    const [isHovered, setIsHovered] = useState<boolean>(false)
    return <div className="flex flex-col items-center w-48 h-48 justify-center perspective-1000 relative group cursor-pointer">
        <motion.div
            className="w-48 h-48 rounded-full bg-[#aeab97] shadow-lg group-hover:shadow-slate-900"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                rotateX: isHovered ? 60 : 0,
                scaleY: isHovered ? 0.7 : 1,
                y: isHovered ? 20 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                className="w-full h-full bg-cover bg-center absolute top-0 left-0 rounded-full"
                style={{
                    backgroundImage: `url('https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/275782519_5081222605249723_4947528912052597894_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEJ398MP5yYy5c0XqH1_BirZWYJdIs9ufBlZgl0iz258I48s5kGJY5iglPK8_KBErVojUryad5xtTuUXq3pJXDR&_nc_ohc=JNWYYr-oT9UQ7kNvwEhVbg9&_nc_oc=AdkgiKr_4kOq659qyzQ3cn8rk1s3fpjla6JemJ46TSXIRk89_yeDA-QhE_W_Dj2eMPY&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=6RXkLBZAjfahs0-Q6bgqjQ&oh=00_AfbYPbrZPNtlUG9--tMZZfUukydgMcSVtvqPudM9uFJ_lw&oe=68BDC3FE')`,
                }}
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            ></motion.div>
        </motion.div>
        {/* Conditionally render the red square */}
        {isHovered && (
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                className="h-20 fixed ml-[150px] mt-[70px] -translate-x-1/2 -translate-y-1/2 z-20 overflow-hidden items-center flex justify-center"
            >
                <LottiePlayer
                    autoplay
                    loop
                    src={cat}
                    style={{ height: '200px', width: '150px' }}
                />
            </motion.div>
        )}
    </div>

};

export default Profile;
