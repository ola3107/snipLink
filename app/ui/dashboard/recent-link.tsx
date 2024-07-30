import clsx from "clsx"
import { BsCopy } from "react-icons/bs";


const linksData = [
    {
        website: "github.com/ola3107/repos",
        shortLink: "snplnk/37482-48",
        status: "deactivated"
    },
    {
        website: "github.com/ola3107/repos",
        shortLink: "snplnk/37482-48",
        status: "active"
    },
    {
        website: "github.com/ola3107/repos",
        shortLink: "snplnk/37482-48",
        status: "deactivated"
    },
    {
        website: "github.com/ola3107/repos",
        shortLink: "snplnk/37482-48",
        status: "active"
    },
    {
        website: "github.com/ola3107/repos",
        shortLink: "snplnk/37482-48",
        status: "active"
    },
   
]




export default function RecentLink() {
    return (
        <div>
            <h2 className="text-3xl font-bold">
                Recent Links
            </h2>

            <div className="mt-6">
                {
                    linksData.map((link, index) => {
                        return (
                            <div key={index} className="py-2 px-2 mt-2 shadow-sm border-b">
                                <div className="flex justify-between">
                                    <h3>{link.website}</h3>
                                    <p className={clsx(
                                        'mb-2',
                                        {'text-green-500': link.status === "active"},
                                        { 'text-red-700': link.status === "deactivated"}
                                    )}>{link.status}</p>
                                </div>
                                <div className="flex gap-3 items-center mb-1">
                                    <p className="">{link.shortLink} </p>
                                    <BsCopy />
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}







