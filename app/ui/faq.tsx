"use client"

import { useState } from "react"
import { IoMdAdd } from "react-icons/io";
import clsx from 'clsx'

const faqData = [
    {
        question: "What is SnipLink?",
        answer: "SnipLink is a URL shortening service that allows users to shorten long URLs into more manageable links. SnipLink also provides users with the ability to customize their shortened URLs to align with their brand identity."
    },
    {
        question: "How Can I Track My URL Clicks?",
        answer: "This option is only available to registered users. Once you create an account you can see the number of visits for all your URLs from your URL list."
    },
    {
        question: "How Can I Redirect My Shorten URL?",
        answer: "All you need to do is share the short URL like you would a normal URL. If users visit the short URL, they will be redirected to the specified page."
    },
    {
        question: "Will My Url Ever be Deleted?",
        answer: "Unless you are creating the URL as a guest. All URLs from registered users will never be deleted. Unless you delete them yourself."
    },
    {
        question: "How Can I Delete My Shorten URL?",
        answer: "You can delete your short URL from your URL list. Once you delete the URL, it will no longer be accessible.Note that this action is irreversible and accessible only to registered users."
    },
   
]

export default function Faq() {
    const [show, setShow] = useState<number | null >(null);
   
    const toggleAccordion = (index: number) => {
        setShow(index === show ? null : index);
    }

    return (
        <div className="py-10" id="faq">
            <h1 className="text-center text-3xl font-bold">FAQ</h1>
            <div className="flex justify-center mt-10">
                <div className="w-[700px]">
                    {faqData.map((faq, index) => {
                        return (
                            <div key={index}>
                                <div onClick={() => toggleAccordion(index)} className={clsx(
                                    "flex justify-between cursor-pointer p-4 rounded-lg mt-2",
                                    show === index ? "bg-slate-200 dark:bg-slate-400" : null,
                                    index !== 0 ? "border-t-2" : null,
                                )}>
                                    <h2>{faq.question} </h2>
                                    <IoMdAdd className="text-2xl" />
                                </div>
                                <div className="mt-4 px-4">
                                    {show === index ? <p>{faq.answer}</p> : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

