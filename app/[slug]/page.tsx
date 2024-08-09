"use client";

import { useEffect, useState } from "react";
import { redirectLink } from "../lib/action";
import { ButtonLoading } from "../ui/loading";

export default function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const redirect = async () => {
            try {
                await redirectLink(slug);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Error redirecting link");
                setLoading(false);
            }

            
        }
        redirect();
    }, [slug]);

    if (loading) {
        return (
            <div className="grid place-content-center h-screen">
                <ButtonLoading />
            </div>
        );
    }
    if (error) {
        return (
            <div className="grid place-content-center h-screen">
                {error}
            </div>
        );
    }

    return null;
}