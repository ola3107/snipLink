import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EditLinkDetails } from "@/app/lib/definations"

export default function EditForm({link}: {link: EditLinkDetails}) {

    return(
       <div className="flex justify-center">
            <div className="max-w-xl flex-1 dark:bg-slate-800 bg-slate-400 px-6 rounded-xl">
                <h1 className="text-3xl font-bold text-white mt-4">Edit your Link</h1>
                <form action="" className="my-10">
                    <div className="mt-6">
                        <label htmlFor="Name">Edit name of your Link</label>
                        <Input type="text" placeholder="snip's getTogether" defaultValue={link.name} />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Link">Edit your Link</label>
                        <Input type="text" placeholder="sample.com" defaultValue={link.link}/>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Customize">Edit your Customize Link(optional)</label>
                        <Input type="text" placeholder="Customize your link" defaultValue={link.customSlug} />
                    </div>
                    <div className="mt-6 text-center">
                        <Button className="font-bold w-full">Edit</Button>
                    </div>
                </form>
            </div>
       </div>
    )
}