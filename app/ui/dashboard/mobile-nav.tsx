import { MdDashboard } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import Link from "next/link";
import Logout from "./logout";

export const MobileNav = () => {
    return(
        <div className=" md:hidden w-full bg-slate-700 bg-slate-500 dark:bg-slate-400 ">
            <div className="flex text-slate-300 justify-between py-3 px-6 w-screen">
                <Link className="grid place-content-center py-1 px-2 border-2 rounded-xl" href="/dashboard">
                    <MdDashboard className="text-2xl"/>
                </Link>
                <Link className="grid place-content-center py-1 px-2 border-2 rounded-xl" href="/dashboard/links">
                    <IoLinkSharp className="text-2xl"/>
                </Link>
                <Link className="grid place-content-center py-1 px-2 border-2 rounded-xl" href="/dashboard/settings">
                    <IoSettings className="text-3xl"/>
                </Link>
                <Logout />
            </div>
        </div>
    )
}









