import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {  BiLogOutCircle } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import {signOut} from "firebase/auth";
import { auth } from "@/app/firebase/config";



export default function Logout() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center justify-center h-[50px] gap-2 p-3 font-medium md:w-full md:justify-start hover:bg-gray-100 md:bg-slate-300 rounded-lg md:dark:bg-slate-600 dark:hover:bg-slate-800">
                    <BiLogOutCircle className="hidden md:block" />
                    <p className="hidden md:block">Logout</p>
                    <div className="p-2 border-2 border-red-500  rounded-xl block md:hidden">
                        <GrLogout className="text-2xl"/>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-red-500">Logout</DialogTitle>
                    <DialogDescription className="text-center font-semibold">
                        Are you sure you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-10 mt-6">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Cancel
                        </Button>
                    </DialogClose>
                    <Button className="btn btn-primary bg-red-500" onClick={() => signOut(auth)}>Logout</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
