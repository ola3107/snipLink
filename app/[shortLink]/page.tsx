"use client"

import { useEffect, useState } from "react";
import { redirectLink } from "../lib/action";
import { ButtonLoading } from "../ui/loading";



export default function Page({params}: {params: {shortLink: string}}) {
    const shortLink = params.shortLink;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const redirect = async () => {
            try {
                await redirectLink(shortLink);
               setLoading(false)
            } catch (err: any) {
                setError(err.message || "Error redirecting link");
                setLoading(false)
            }
        }
        redirect() 
        
    }, [shortLink])

    if(loading){
        return (
            <div className="grid place-content-center h-screen">
                <ButtonLoading />
            </div>
        )
    }
    if(error){
        return (
            <div className="grid place-content-center h-screen">
                {error}
            </div>
        )
    }
}