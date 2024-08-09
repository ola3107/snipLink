import Mode from "@/app/ui/settings/mode"
import UpdatePassword from "@/app/ui/settings/update-passworde"

export default function page() {
    return(
        <div>
            <h1 className="text-3xl font-bold">Settings</h1>

            <div className="mt-12 flex flex-col gap-4">
                <Mode />
                <UpdatePassword />
            </div>



        </div>
    )
}