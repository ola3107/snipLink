"use client"

import Link from "next/link"
import { IoSettings } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";
import clsx from "clsx";



const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: FaHome
    },
    {
        name: "Links",
        href: "/dashboard/links",
        icon: FaLink
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: IoSettings
    }
]

export default function SideNavLinks() {
    const pathname = usePathname()
    return (
       <div>
         {
            links.map((link, index) => {
                const Icon = link.icon;
                return(
                    <Link 
                    key={index} 
                    href={link.href}
                    className={clsx(
                        "flex h-[50px] mt-2 grow items-center justify-center gap-2 p-3 font-medium text-sm rounded-lg hover:bg-slate-400 hover:text-white bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-800 md:flex-none md:justify-start md:p-2 md:px-3",
                        {
                            'dark:bg-slate-800 bg-slate-400 text-white': pathname === link.href
                        }
                    )}
                    >
                        <Icon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })
         }
       </div>
    )
}