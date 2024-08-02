"use client"

import SideNav from "../ui/dashboard/side-nav";
import { MobileNav } from "../ui/dashboard/mobile-nav";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import {auth} from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ButtonLoading } from "../ui/loading";

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
       <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="md:w-72 shadow-2xl">
                <SideNav />
            </div>
            <div className="block md:hidden fixed bottom-0">
                <MobileNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
       </div>
    )

}
