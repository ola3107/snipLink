"use client"

import { GiClick } from "react-icons/gi";
import { FaLink } from "react-icons/fa";
import { getTotalClicks, getTotalLinks } from "@/app/lib/action";
import { useEffect, useState } from "react";


const Icons = {
    clicks: GiClick,
    links: FaLink
}

interface cardProps {
    name: string,
    value: number,
    icon: "clicks" | "links"
}




export default function CardWrapper() {

    const [totalClicks, setTotalClicks] = useState<number>(0);
    const [totalLinks, setTotalLinks] = useState<number>(0);

    useEffect(() => {
        const fetchTotalClicks = async () => {
            const clicks = await getTotalClicks();
            const links = await getTotalLinks();
            setTotalClicks(clicks? clicks : 0);
            setTotalLinks(links? links : 0);
        }
        fetchTotalClicks();
    }, [])
    return(
        <>
            <Card name='Total Clicks' icon="clicks" value={totalClicks} />
            <Card name="Total Links" icon="links" value= {totalLinks} />
        </>
           
    )
}




export const Card: React.FC<cardProps> = ({name, value, icon}) => {
    const Icon = Icons[icon];
    return (
        <div className="rounded-xl dark:bg-slate-600 dark:text-slate-100 bg-slate-200 text-gray-800 px-2 py-2 md:py-4 shadow-xl">
            <div className="flex gap-3 justify-center md:text-2xl items-center font-semibold">
                {Icon ? <Icon className="h-5 w-5 text-2xl" /> : null}
                <h3>{name}</h3>
            </div>
            <p className="text-center px-4 text-xl md:text-2xl md:mt-4">{value}</p>
        </div>
    )
}