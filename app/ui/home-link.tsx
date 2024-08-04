'use client'

import Link from "next/link";


const links = [
    { href: "#hero", name: "Home"},
    { href: "#features", name: "Features"},
    { href: "#pricing", name: "Pricing"},
    { href: "#faq", name: "FAQ"},
]

export function HomeLink() {
    return (
        <nav className="flex gap-6">
            {links.map((link) => {
                return (
                    <Link 
                    key={link.href} 
                    href={link.href}
                    className="font-semibold text-lg hover:text-blue-500"
                    >
                        <p>{link.name}</p>
                    </Link>
                )
            })}
        </nav>
    )
}

export function MobileHomeLink() {
    return (
        <nav className="flex flex-col gap-6">
            {links.map((link) => {
                return (
                    <Link 
                    key={link.href} 
                    href={link.href}
                    className="font-semibold text-lg hover:text-blue-500 w-full border-b-2 py-2"
                    >
                        <p>{link.name}</p>
                    </Link>
                )
            })}
        </nav>
    )
}