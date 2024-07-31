"use client"

import { BreadCrumb } from "@/app/ui/breadcrumb";
import { getLinkById } from "@/app/lib/action";
import { FullLinkDetails } from "@/app/lib/definations";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteLink } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";



export default function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const [link, setLink] = useState<FullLinkDetails | null>(null);
    const router = useRouter();
    const createdAtDate = link?.createdAt?.toDate ? link.createdAt.toDate() : null;
    const formattedDate = createdAtDate ? createdAtDate.toDateString() : null;
    const qrCodeUrl = link?.QrCode ?? '';
    const handleDelete = async (id: string, shortLink: string) => {
        try {
            await deleteLink(id, shortLink);
            router.push("/dashboard/links")
        } catch (error) {
          console.error("Error deleting link", error)
        }
    }

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const fetchedLink = await getLinkById(id);
                if (fetchedLink) {
                  const extendedLink: FullLinkDetails = {
                    ...fetchedLink,
                    QrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${fetchedLink.link}`
                  };
                  setLink(extendedLink);
                } else {
                  setLink(null);
                }
              } catch (error) {
                console.error("Error fetching link", error);
                setLink(null);
            }
        }

        fetchLink();
    }, [id]);

    return (
        <div>
            <BreadCrumb children={[
                {label: "Dashboard", href: "/dashboard"},
                {
                    label: "Link Details",
                    href: "/dashboard/links/",
                    active: true
                }
            ]} />

            <Button onClick={() => router.back()} className="gap-2 text-lg font-semibold mt-4"><IoArrowBack /> Back</Button>
            
            <div className="flex justify-center">
                <div className="pt-20 mb-14 flex flex-col gap-6">
                    <p>Name:<span className="ml-4 text-xl font-semibold">{link?.name}</span></p>
                    <p>Link:<span className="ml-4 text-xl font-semibold">{link?.link}</span></p>
                    <p>Short Link:<span className="ml-4 text-xl font-semibold">sniplink-five.vercel.app/{link?.shortLink}</span></p>
                    <p>Clicks:<span className="ml-4 text-xl font-semibold">{link?.clicks}</span></p>
                    <p>Custom Slug:<span className="ml-4 text-xl font-semibold">sniplink-five.vercel.app/{link?.customSlug}</span></p>
                    <p>Created At:<span className="ml-4 text-xl font-semibold">{formattedDate}</span></p>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <Image src={link?.QrCode ?? ''} alt="image" width={200} height={200} />
                        <Button className="bg-green-600 text-slate-200">
                            <a href={qrCodeUrl} download="qr-code.png" target="_blank" rel="noreferrer">
                            Download QR Code
                            </a>
                        </Button>
                    </div>
                    <Button className="bg-red-400 mt-4 font-bold" onClick={() => {link?.id && handleDelete(link.id, link.shortLink)}}>delete Link</Button>
                </div>
            </div>

        </div>

        
    );
}