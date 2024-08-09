import { LinkDetails } from '../../lib/definations';
import { SiGoogleanalytics } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import Link from 'next/link';
import { copyToClipboard } from "@/app/lib/action";
import { CopiedToast } from "@/app/ui/button";




export default function MobileLink( data: {data: LinkDetails[]}) {
    return(
        <div className='md:hidden mb-16'>
            <Link href='/dashboard/links/create'><Button className="mb-4"><IoMdAdd className="mr-2 text-2xl"/> Create Link</Button></Link>

            {
                data.data.length === 0 ? <p className="text-center text-xl">No links created yet</p> :
                data.data.map((link) => {
                    const Longurl = link?.link
                    const formatted = Longurl.length > 30 ? `${Longurl.substring(0, 30)}...` : Longurl
                    return (
                        <div key={link.id} className=" p-2 rounded-lg shadow-md mb-4">
                        
                        <div className="flex justify-between items-center">
                            <div className='flex-1'>
                                <div className="">
                                    <Link href={`/dashboard/links/${link.id}/details`} >
                                        <p className="font-semibold text-lg underline">{link.name}</p>
                                        <p className="text-xs text-gray-500">{formatted}</p>
                                    </Link>
                                </div>
                                <div className="mt-1 flex items-center gap-6">
                                    <p className='text-sm'>{`sniplink-five.vercel.app/${link.shortLink}`}</p>
                                    <div 
                                    className="text-xl mt-2"
                                    onClick={() => {copyToClipboard(`sniplink-five.vercel.app/${link?.shortLink}`)}}
                                    ><CopiedToast /></div>
                                </div>
                                <p className='text-[10px] mt-2 text-gray-400'>{link.createdAt.toDate().toDateString()}</p>
                            </div>
                            <div >
                                <p className='text-xl'>{link.clicks}</p>
                                <SiGoogleanalytics className="text-blue-500"/>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}