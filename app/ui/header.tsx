'use client'

import {HomeLink, MobileHomeLink} from "./home-link";
import {Btn} from "./button";
import SnipLinkLogo from "./snipLink-logo";
import { RiMenuFold3Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import LoginModal from "./login-modal";


export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        }else {
            setShowMenu(true);
        }
    }


    return (
        <>
            <header className="hidden md:flex justify-between items-center rounded-[20px] py-2 px-2 my-10 shadow">
                <SnipLinkLogo />
                <HomeLink />
                <LoginModal />
            </header>
            <header>
                <div className="flex justify-between items-center border-2 rounded-[20px] py-2 px-2 my-5 shadow md:hidden">
                    <SnipLinkLogo />
                    <RiMenuFold3Fill className="text-2xl" onClick={toggleMenu}/>
                    {showMenu && (<div className="flex flex-col gap-4 absolute top-0 right-0 w-full h-screen px-6 shadow bg-slate-300 dark:bg-slate-900 dark:text-white pb-8 rounded-md" onClick={toggleMenu}>
                        <IoCloseSharp className="text-2xl my-5" onClick={toggleMenu}/>
                        <MobileHomeLink />
                    </div>)}
                </div>
            </header>
        </>
       
    )
}