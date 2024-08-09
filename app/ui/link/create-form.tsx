"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, FormEvent } from "react"
import { handleCreateShortenLink } from "@/app/lib/action"
import { useRouter } from "next/navigation";

export default function CreateForm() {
    const [form, setForm] = useState({ name: "", link: "", customize: ""})
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setForm((prev) => ({...prev, [name]: value}))
    }

    const createShortLink = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleCreateShortenLink(form.name, form.link, form.customize);
            router.push("/dashboard/links");
        } catch (error) {
            console.error("Error creating link", error);
            setError(error);
            setLoading(false);
        }
    };

    return(
       <div className="flex justify-center mb-16">
            <div className="max-w-xl flex-1 dark:bg-slate-800 bg-slate-400 px-6 rounded-xl">
                <h1 className="text-3xl font-bold text-white mt-4">Create your Link</h1>
                <form action="" className="my-10">
                    <div className="mt-6">
                        <label htmlFor="Name">Name of your Link</label>
                        <Input 
                        name="name"
                        type="text" 
                        placeholder="snip's getTogether" 
                        value={form.name}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Link">Enter your Link</label>
                        <Input 
                        name="link"
                        type="text" 
                        placeholder="sample.com" 
                        value={form.link}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Customize">Customize your Link(optional)</label>
                        <Input 
                        name="customize"
                        type="text" 
                        placeholder="Customize your link" 
                        value={form.customize}
                        onChange={handleChange}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-4">{error.message}</p>}
                    <div className="mt-6 text-center">
                        <Button className="font-bold w-full font-semibold" disabled={loading} onClick={createShortLink}>{loading? "Creating Link..." : "Create Link"}</Button>
                    </div>
                </form>
            </div>
       </div>
    )
}