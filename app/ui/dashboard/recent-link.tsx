"use client"

import {getRecentLinks} from "@/app/lib/action";
import { copyToClipboard } from "@/app/lib/action"
import { CopiedToast } from "../button"

export default async function RecentLinks() {
    const links = await getRecentLinks();

    return (
        <div>
            <h2 className="text-3xl font-bold">
                Recent Links
            </h2>

            <div className="mt-6">
                { links.length === 0 ? <div className="text-sm text-center">
                    <p>you have no link created yet, head over to the link page to create a new link</p>
                </div> :
                    links.map((link, index) => {
                        return (
                            <div key={index} className="py-2 px-2 mt-2 shadow-sm border-b">
                                <div className="flex justify-between">
                                    <h3 className="text-xl font-bold">{link.name}</h3>
                                </div>
                                <div className="flex gap-6 items-center mt-1">
                                    <a href={`/${link.shortLink}`} target="blank" className="italic">sniplink-five.vercel.app/{link.shortLink}</a>
                                    <div 
                                    className="text-xl"
                                    onClick={() => {copyToClipboard(`sniplink-five.vercel.app/${link.shortLink}`)}}
                                    ><CopiedToast /></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}







