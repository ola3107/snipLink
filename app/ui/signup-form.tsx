"use client"

import { lusitana } from "./font"
import { HiAtSymbol } from "react-icons/hi";
import { MdOutlineKey } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { Btn } from "./button";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [form, setForm] = useState({ email: "", password: ""})
    const [createUserWithEmailAndPassword,] = useCreateUserWithEmailAndPassword(auth)
    const Router = useRouter()
    
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setForm((prev) => ({...prev, [name]: value}))
        console.log(form)
    }
    
    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(form.email, form.password)
            console.log(res)
            setForm({ email: "", password: ""})
            if(res?.user){
                console.log("User Created Successfully")
                Router.push("/dashboard")
            }
            console.log("User Created Successfully")
        } catch (error) {
            console.log("Error during sign up:", error)
        }
    }

    






    return (
        <form action="">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 dark:bg-slate-700">
                <div className={`${lusitana.className} mb-3 text-2xl text-center`}>
                    <h1 className="font-semibold">
                        Create an Account
                    </h1>
                </div>
                <div className="w-full ">
                    <div>
                        <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-slate-100"
                        htmlFor="email"
                        >
                        Email
                        </label>
                        <div className="relative dark:text-slate-200">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            required
                        />
                        <HiAtSymbol className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-200" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-slate-100"
                        htmlFor="password"
                        >
                        Password
                        </label>
                        <div className="relative dark:text-slate-200">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                        <MdOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-200" />
                        </div>
                    </div>
                </div>
                <Button className="mt-6 w-full bg-blue-500 text-slate-200 hover:bg-blue-700" onClick={handleSignUp}>Sign Up</Button>
                <p className="text-center mt-6">Or Signup With</p>
                <div className="flex justify-center gap-8 mt-4">
                    <FcGoogle className="text-4xl"/>
                    <BsGithub className="text-4xl"/>
                    <BsTwitterX className="text-4xl"/>
                </div>
            </div>
            <div>
                <p className="text-center mt-4">
                    Already have an account? <Link href="/login" className="text-blue-400">Log in</Link>
                </p>
            </div>
        </form>
    )
}