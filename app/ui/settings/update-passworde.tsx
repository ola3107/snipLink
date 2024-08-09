'use client'

import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, AuthError } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import SnipLinkLogo from "../snipLink-logo";
import { lusitana } from "../font";
import { MdOutlineKey } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { RiEditLine } from "react-icons/ri";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
export default function UpdatePassword() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleChange = (e: FormEvent<HTMLInputElement>) =>{
        const { name, value} = e.currentTarget
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handlePasswordUpdate = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        if(form.newPassword !== form.confirmNewPassword){
            setLoading(false)
            setError("Passwords do not match, please try again.")
            setTimeout(() => {
                setError(null)
            }, 5000)
            return
        }

        const user = auth.currentUser
        try{
            if (user && user.email){
                const credential = EmailAuthProvider.credential(
                    user.email,
                    form.currentPassword
                )
                await reauthenticateWithCredential(user, credential)
                await updatePassword(user, form.confirmNewPassword)
                setMessage("password updated successfully!!!")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                })
                setLoading(false)
            }else{
                setError("No user is currently available")
                setLoading(false)
            }
        } catch(error) {
            const authError = error as AuthError
            if (authError.code === "auth/invalid-credential"){
                setError("incorrect current password. Try again!!!")
            } else if(authError.code === "auth/too-many-requests"){
                setError("Too many attempt. Try again later")
            } else(
                setError("An unknown error occured while Updating password!!")
            )
            
        } finally{
            setLoading(false)
            setForm({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            })
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }






    return(
        <div className="flex items-center justify-between md:max-w-2xl">
            <div>
                <h1 className="font-semibold text-xl">Security (password)</h1>
                <p className="italic text-xs">update your password</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="outline bg-white dark:bg-slate-950 hover:bg-slate-100 " size="icon">
                        <RiEditLine className="h-[1.2rem] w-[1.2rem] dark:text-white text-slate-700" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <SnipLinkLogo />
                        </DialogTitle>
                        <DialogDescription className="text-center font-semibold text-xl">
                            Update Your Password
                        </DialogDescription>
                    </DialogHeader>
                    <form action="">
                        <div className="flex-1 rounded-xl bg-gray-50 px-6 pb-4 pt-8 dark:bg-slate-700">
                            <div className="w-full">
                                <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-slate-100"
                                    htmlFor="password"
                                    >
                                    Current Password
                                    </label>
                                    <div className="relative dark:text-slate-200" >
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                                        id="currentPassword"
                                        type="password"
                                        name="currentPassword"
                                        value={form.currentPassword}
                                        onChange={handleChange}
                                        placeholder="Enter current password"
                                        required
                                        minLength={6}
                                    />
                                    <MdOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-200" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-slate-100"
                                    htmlFor="password"
                                    >
                                    New Password
                                    </label>
                                    <div className="relative dark:text-slate-200" >
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                                        id="newPassword"
                                        type="password"
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        required
                                        minLength={6}
                                    />
                                    <MdOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-200" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-slate-100"
                                    htmlFor="password"
                                    >
                                    Confirm New Password
                                    </label>
                                    <div className="relative dark:text-slate-200" >
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmNewPassword"
                                        value={form.confirmNewPassword}
                                        onChange={handleChange}
                                        placeholder="confirm new password"
                                        required
                                        minLength={6}
                                    />
                                    <MdOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-200" />
                                    </div>
                                </div>
                            </div>
                            {message && <p className="text-green-500 text-center mt-4 font-bold">{message}</p>}
                            {error && <p className="text-red-500 text-center mt-4 font-bold">{error}</p>}
                            <Button className="bg-blue-500 w-full mt-6 text-slate-200 hover:bg-blue-700" disabled={loading} onClick={handlePasswordUpdate} type="submit">{loading? "Updating..." : "Update"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
