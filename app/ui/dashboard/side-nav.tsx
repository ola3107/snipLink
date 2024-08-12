"use client"

import SideNavLinks from "./sidenav-links";
import SnipLinkLogo from "../snipLink-logo";
import Link from "next/link";
import Logout from "./logout";
import { LuUserCircle } from "react-icons/lu";



export default function SideNav({user}: {user: string}) {

   
    return(
        <div className="flex h-full flex-col px-3 py-4 md:px-3">
            <Link href="/" className="">
                <div className=" md:pt-20 p-3 bg-slate-700 text-white dark:bg-slate-500 rounded-2xl">
                    <SnipLinkLogo />
                    <div className="flex justify-end md:hidden">
                        <LuUserCircle className="text-2xl" />
                        {user}
                    </div>
                </div>
            </Link>
            <div className="hidden md:flex grow justify-between flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <SideNavLinks />
                <div className="hidden md:block h-auto w-full grow"></div>
                <Logout />
            </div>
        </div>
    )

}