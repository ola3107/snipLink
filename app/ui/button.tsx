import Link from "next/link"
import clsx from "clsx"
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { IconType } from 'react-icons';
import { Button } from "@/components/ui/button";
import { MdOutlineContentCopy } from "react-icons/md";



interface BtnProps {
    name: string;
    href?: string;
    className?: string;
}


export  const Btn: React.FC<BtnProps> = ({name, href="", className=""}) => {
    return (
        <Link href={href}>
            <button className={clsx(
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl",
                className
            )} >
                {name}
            </button>
        </Link>
    )
}



export const CopiedToast = () => {
    const { toast } = useToast()
   
    return (
      <div
        onClick={() => {
          toast({
            description: "Copied to clipboard",
          })
        }}
      >
        < MdOutlineContentCopy />
      </div>
    )
}

export const DeleteToast = async () => {
    const { toast } = useToast()

    return (
        <div
        onClick={() => {
          toast({
            description: "Link Deleted",
          })
        }}
      >
        Delete Link
      </div>
    )
}
