"use client"

import { RefObject, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsAtBottom } from '../app/component/hooks/useIsBottom';
import { useIsScrolling } from './component/hooks/useIsScrolling';
import { LuArrowUpFromDot } from 'react-icons/lu';
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Projects from "./Projects/Projects";
import Tech from "./Tech/Tech";
import Sidebar from "./component/Sidebar";
import Modalcontact from './component/util/modal/Modalcontact';
import About from './About/About';


export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const [allowScroll, setAllowScroll] = useState<boolean>(false)
  const HeroRef = useRef(null);
  const ProjectsRef = useRef(null);
  const TechStatck = useRef(null);
  const AboutRef = useRef(null)
  const mainContainerRef = useRef(null);
  const isAtBottom = useIsAtBottom(mainContainerRef, 100);
  const isScrolling = useIsScrolling(mainContainerRef);

  const handleOpenModal = () => {
    setOpen(!open);
    setOpenSidebar(false)
  };

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  const scrollToRef = (ref: RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  useEffect(() => {
    setAllowScroll(false)
    const timer = setTimeout(() => {
      setAllowScroll(true)
    }, 3500);
    return () => clearTimeout(timer)
  }, []);



  return (
    <div ref={mainContainerRef} className={`mainColor h-screen w-screen flex flex-col items-center py-3 snap-y snap-mandatory relative scroll-smooth ${allowScroll ? "overflow-x-auto overflow-y-scroll " : "overflow-hidden"}`}>

      <div className="fixed top-3 left-[10%] z-50 xl:hidden">
        <Sidebar
          scrollToHero={() => scrollToRef(HeroRef)}
          scrollToProjects={() => scrollToRef(ProjectsRef)}
          scrollToTechStack={() => scrollToRef(TechStatck)}
          scrollToAbout={() => scrollToRef(AboutRef)}
          handleOpenContacts={handleOpenModal}
          handleOpenSidebar={handleOpenSidebar}
          openSidebar={openSidebar}
          isUserScrolling={isScrolling}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }} // The 2-second delay is added here
        className='h-full w-full items-center justify-center flex '
      >
        <Header
          scrollToHero={() => scrollToRef(HeroRef)}
          scrollToProjects={() => scrollToRef(ProjectsRef)}
          scrollToTechStack={() => scrollToRef(TechStatck)}
          scrollToAbout={() => scrollToRef(AboutRef)}
          handleOpenContacts={handleOpenModal}
          isUserScrolling={isScrolling}
        />
      </motion.div>
      {/* Pass the functions as props */}

      <div ref={HeroRef} className="w-[100%] h-[100%] shrink-0">
        <Hero />
      </div>
      <div ref={TechStatck} className=" mt-5">
        <Tech />
      </div>
      <div ref={ProjectsRef}>
        <Projects />
      </div>
      <div ref={AboutRef} className=" w-full h-full flex flex-col items-center justify-center shrink-0 relative">
        <About />

        {isAtBottom && (
          <div className='absolute bottom-20 '>
            <button onClick={() => scrollToRef(HeroRef)} className='h-10 w-10 rounded-full items-center justify-center bg-slate-800/50 flex animate-bounce hover:animate-none duration-300 focus:scale-90 hover:scale-110 cursor-pointer'>
              <LuArrowUpFromDot size={25} />
            </button>
          </div>
        )}


        <div className='w-full  flex justify-center absolute bottom-0 font-roboto'>
          <h3 className='italic text-md font-thin text-slate-500 '>SeekerDev <span className='font-roboto tracking-wider'>V.2</span></h3>
        </div>
      </div>

      <Modalcontact open={open} close={handleOpenModal} />
    </div>
  );
}