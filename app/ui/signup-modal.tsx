"use client"

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { lusitana } from "./font"
import { HiAtSymbol } from "react-icons/hi";
import { MdOutlineKey } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, AuthError, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase/config"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SnipLinkLogo from "./snipLink-logo";


export default function SignupModal() {
    const [form, setForm] = useState({ email: "", password: ""})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const Router = useRouter()
    
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setForm((prev) => ({...prev, [name]: value}))
    }
   
    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await createUserWithEmailAndPassword(auth, form.email, form.password)
            if(res?.user){
                Router.push("/dashboard")
            }
            console.log("User Created Successfully")
        } catch (error) {
            const authError = error as AuthError
            let errorMessage = "An error occurred while signing up"
            if (authError.code ===  "auth/email-already-in-use"){
                errorMessage = "User with provided email already exist."
            }
            if(authError.code === "auth/missing-email"){
                errorMessage = "Please provide an email address."
            }
            if(authError.code === "auth/missing-password"){
                errorMessage = "Please provide a password."
            }
            setError(errorMessage)
            setLoading(false)
        }finally{
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true)
        try {
            await signInWithPopup(auth, provider);
            Router.push("/dashboard")
        } catch (e) {
            console.error("Error during sign in:", e);
            setError("An error occured while Signin in")
        } finally{
            
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const githubSignIn = async () => {
        const provider = new GithubAuthProvider();
        setLoading(true)
        try {
            await signInWithPopup(auth, provider);
            Router.push("/dashboard")
        } catch (e) {
            console.error("Error during sign in:", e);
            setError("An error occured while Signin in")
            setLoading(false)
        } finally{
            
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="text-blue-500 hover:text-blue-300 cursor-pointer">
                    Sign up
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <SnipLinkLogo />
                    </DialogTitle>
                    <DialogDescription className="text-center font-semibold">
                        Are you ready to shorten your links? Sign in to get started.
                    </DialogDescription>
                </DialogHeader>
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
                        {error && <p className="text-red-500 text-center mt-4 font-bold">{error}</p>}
                        <Button disabled={loading} className="mt-6 w-full bg-blue-500 text-slate-200 hover:bg-blue-700" onClick={handleSignUp}>{loading? "Signing Up" : "Sign Up"}</Button>
                        <p className="text-center mt-6">Or Signup With</p>
                        <div className="flex justify-center gap-8 mt-4">
                            <FcGoogle className="text-4xl" onClick={googleSignIn}/>
                            <BsGithub className="text-4xl" onClick={githubSignIn}/>
                        </div>
                    </div>
                    <div>
                        <p className="text-center mt-4">
                            Already have an account? <DialogClose>
                                <p className="text-blue-400">Log in</p>
                            </DialogClose>
                        </p>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}