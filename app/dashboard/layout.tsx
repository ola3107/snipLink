"use client"

import SideNav from "../ui/dashboard/side-nav";
import { MobileNav } from "../ui/dashboard/mobile-nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {auth} from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { ButtonLoading } from "../ui/loading";
import { LuUserCircle } from "react-icons/lu";

export default function Layout({children}: {children: React.ReactNode}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              setLoading(false);

            } else {
              router.push("/");
            }
        });
    
        return () => {
            unsubscribe();
        }
    }, [router]);

    if(loading){
        return <div className="grid place-content-center h-screen"><ButtonLoading /></div>
    }

    return (
           <div className="md:max-w-screen-2xl mx-auto">
               <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                    <div className="md:w-72 shadow-2xl">
                        <SideNav user={user?.email || ""} />
                    </div>
                    <div className="block md:hidden fixed bottom-0 z-50">
                        <MobileNav />
                    </div>
                    <div className="flex-1 p-6 md:overflow-y-auto md:px-12">
                        <div className="border-2 z-50 px-4 py-2 sticky top-0 justify-end mb-3 rounded-xl hidden md:flex bg-slate-100 dark:bg-slate-700">
                            <div className="border-2 flex items-center gap-2 px-2 py-1 rounded-xl">
                                <LuUserCircle className="text-2xl" />
                                <p className="text-lg">{user?.email}</p>
                            </div>
                        </div>
                        {children}
                    </div>
               </div>
           </div>
    )

}
