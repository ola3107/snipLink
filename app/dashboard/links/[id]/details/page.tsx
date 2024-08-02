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
import { DeleteToast } from "@/app/ui/button";
import { copyToClipboard } from "@/app/lib/action";
import { CopiedToast } from "@/app/ui/button";



export default function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const [link, setLink] = useState<FullLinkDetails | null>(null);
    const router = useRouter();
    const createdAtDate = link?.createdAt?.toDate ? link.createdAt.toDate() : null;
    const formattedDate = createdAtDate ? createdAtDate.toDateString() : null;
    const qrCodeUrl = link?.QrCode ?? '';
    const handleDelete = async (id: string, shortLink: string, customSlug?: string) => {
        try {
            await deleteLink(id, shortLink, customSlug);
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
            <div className="">
                <div className="pt-10 md:pt-20 mb-14 flex flex-col gap-6">
                    <div className="flex gap-4 font-semibold">
                        <p>Name:</p>
                        <p>{link?.name}</p>
                    </div>
                    <div className="flex gap-4 font-semibold">
                        <p>URL:</p>
                        <div className="break-all">
                            <p >{link?.link}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 font-semibold items-center">
                        <p>Short Link:</p>
                        <a href={`/${link?.shortLink}`}>sniplink-five.vercel.app/{link?.shortLink}</a>
                        <div 
                        className="text-xl"
                        onClick={() => {copyToClipboard(`sniplink-five.vercel.app/${link?.shortLink}`)}}
                        ><CopiedToast /></div>
                    </div>
                    <div className="flex gap-4 font-semibold items-center">
                        <p>Custom Slug:</p>
                        <p >sniplink-five.vercel.app/{link?.customSlug}</p>
                        <div 
                        className="text-xl"
                        onClick={() => {copyToClipboard(`sniplink-five.vercel.app/${link?.customSlug}`)}}
                        ><CopiedToast /></div>
                    </div>
                    <div className="flex gap-4 font-semibold">
                        <p>Clicks:</p>
                        <p >{link?.clicks}</p>
                    </div>
                    <div className="flex gap-4 font-semi-bold">
                        <p>Created At:</p>
                        <p >{formattedDate}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <Image src={link?.QrCode ?? ''} alt="image" width={200} height={200} />
                        <Button className="bg-green-600 text-slate-200 dark:hover:text-slate-800">
                            <a href={qrCodeUrl} download="qr-code.png" target="_blank" rel="noreferrer">
                            Download QR Code
                            </a>
                        </Button>
                    </div>
                    <div 
                    className="flex justify-center md:block">
                        <Button 
                        className="bg-red-600 mt-4 w-64" 
                        onClick={() => {link?.id && handleDelete(link.id, link.shortLink, link.customSlug)}}>
                            <DeleteToast />
                        </Button>
                    </div>
                </div>
            </div>

        </div>

        
    );
}
