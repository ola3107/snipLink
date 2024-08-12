"use client"

import { MdDashboard } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";
import Logout from "./logout";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: MdDashboard 
    },
    {
        name: "Links",
        href: "/dashboard/links",
        icon: IoLinkSharp
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: IoSettings
    }
]

export const MobileNav = () => {
    const pathname = usePathname()
    return(
        <div className=" md:hidden block z-50 w-full bg-slate-700 bg-slate-500 dark:bg-slate-400 flex items-center">
            <div className="flex text-slate-200 justify-between px-3 w-screen">
                {
                    links.map((link, index) => {
                        const Icon = link.icon;
                        return(
                            <Link
                            href={link.href}
                            className="text-center flex flex-col items-center"
                            key={index}
                            >
                            <div className={clsx(
                                "mt-3 w-10 p-3 flex justify-center rounded-lg hover:bg-slate-400 hover:text-white dark:hover:bg-slate-800 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    'dark:bg-slate-800 bg-slate-400 text-white': pathname === link.href
                                }
                            )} >
                                <Icon className="w-10" />
                            </div>
                            <p className="font-bold">{link.name}</p>
                            </Link>
                        )
                    })
                }
                <div className="mt-2">
                    <Logout />
                    <p className="font-bold">Log out</p>
                </div>
            </div>
        </div>
    )
}









