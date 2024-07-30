import { LinkDetails } from '../../lib/definations';
import { SiGoogleanalytics } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import Link from 'next/link';



export default function MobileLink( data: {data: LinkDetails[]}) {
    return(
        <div className='md:hidden mb-16'>
            <Link href='/dashboard/links/create'><Button className="mb-4"><IoMdAdd className="mr-2 text-2xl"/> Create Link</Button></Link>

            {
                data.data.map((link) => (
                    
                    <div key={link.id} className=" p-2 rounded-lg shadow-md mb-4">
                        <Link href={`/dashboard/links/${link.id}/details`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">{link.name}</p>
                                    <p className="text-xs text-gray-500">{link.link}</p>
                                    <p className='text-xs'>Created At: {link.createdAt.toDate().toDateString()}</p>
                                </div>
                                <div>
                                    <p className='text-xl'>{link.clicks}</p>
                                    <SiGoogleanalytics className="text-blue-500"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}