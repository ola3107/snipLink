"use client"

import CreateForm from "@/app/ui/link/create-form"
import { BreadCrumb } from "@/app/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function page() {
    const router = useRouter()

    return(
        <div>
            <BreadCrumb children={[
                {label: "Dashboard", href: "/dashboard"},
                {
                    label: "Create Link",
                    href: "/dashboard/links/create",
                    active: true
                }
            ]} />

            <Button onClick={() => router.back()} className="gap-2 text-lg font-semibold mt-4"><IoArrowBack /> Back</Button>

            
            <div className="mt-10">
                <CreateForm />
            </div>
        </div>
    )
}