"use client"

import EditForm from "@/app/ui/link/edit-form"
import { BreadCrumb } from "@/app/ui/breadcrumb"
import { useEffect } from "react"
import { EditLinkById } from "@/app/lib/action"
import { EditLinkDetails, LinkDetails } from "@/app/lib/definations"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { getLinkById } from "@/app/lib/action"
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react"

export default function Page({params}: {params: {id: string}}) {
    const id = params.id
    const router = useRouter()
    const [link, setLink] = useState<EditLinkDetails | null>(null)
    const [publicValue, setPublicValue] = useState<string>("")
    useEffect(() => {
        const fetchLink = async () => {
            try{
                const fetchLink = await EditLinkById(id)
                const fetchFullLink = await getLinkById(id)
                const shortLink = fetchFullLink?.shortLink || ""
                setLink(fetchLink)
                setPublicValue(shortLink)
            } catch (error) {
                console.error("Error fetching link", error)
            }    
        }
        
        fetchLink()
    }, [id])
    
    return(
        <div className="mb-20 md:mb-0">
            <BreadCrumb children={[
                {label: "Dashboard", href: "/dashboard"},
                {
                    label: "Edit Link",
                    href: "/dashboard/links/",
                    active: true
                }
            ]} />

            <Button onClick={() => router.back()} className="gap-2 text-lg font-semibold mt-4"><IoArrowBack /> Back</Button>

            {link && (
                <div className="mt-10">
                    <EditForm link={link} id={id} shortLink={publicValue}/>
                </div>
            )}
        </div>
    )
}