import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EditLinkDetails } from "@/app/lib/definations"
import { updateLink } from "@/app/lib/action"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface EditFormProps {
    link: EditLinkDetails,
    id: string
    shortLink: string
}

export default function EditForm({link, id, shortLink}: EditFormProps) {
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        link: "",
        customSlug: "" 
    })

    useEffect(() => {
        setForm({
            name: link.name || "",
            link: link.link || "",
            customSlug: link.customSlug || ""
        })
    }, [link])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = async () => {
        try {
            await updateLink(id, form.name, form.link,shortLink, form.customSlug)
            router.push("/dashboard/links")
        } catch (error) {
            console.error("Error updating link", error)
        }
    }

    return(
       <div className="flex justify-center">
            <div className="max-w-xl flex-1 dark:bg-slate-800 bg-slate-400 px-6 rounded-xl">
                <h1 className="text-3xl font-bold text-white mt-4">Edit your Link</h1>
                <form action="" className="my-10" onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                    <div className="mt-6">
                        <label htmlFor="Name">Edit name of your Link</label>
                        <Input type="text" 
                        placeholder="snip's getTogether"
                        name="name" 
                        value={form.name}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Link">Edit your Link</label>
                        <Input type="text" 
                        placeholder="sample.com" 
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Customize">Edit your Customize Link(optional)</label>
                        <Input type="text" 
                        placeholder="Customize your link" 
                        name="customSlug"
                        value={form.customSlug}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <Button type="submit" className="font-bold w-full">Edit</Button>
                    </div>
                </form>
            </div>
       </div>
    )
}