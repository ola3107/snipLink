"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LinkDetails } from "@/app/lib/definations"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import Link from "next/link"
  import { deleteLink } from "@/app/lib/action"
  import { copyToClipboard } from "@/app/lib/action"
  import { CopiedToast } from "../button"
  import { DeleteToast } from "../button"
import { format } from "path"

export const columns: ColumnDef<LinkDetails>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
          const name = row.getValue("name")
          const linkDetails = row.original
          return (<Link href={`/dashboard/links/${[linkDetails.id]}/details`}>
            <div className="hover:underline">{linkDetails.name}</div>
          </Link>)
        }
    },
    {
        accessorKey: 'link',
        header: 'Link',
        cell: ({ row }) => {
          const link: string = row.getValue("link")
          const formatted = link.length > 30 ? `${link.substring(0, 30)}...` : link
          return <p>{formatted}</p>
        }
    },
    {
        accessorKey: 'shortLink',
        header: 'Short Link',
        cell: ({ row }) => {
          const shortLink = row.getValue("shortLink")
          const formatted = `sniplink-five.vercel.app/${shortLink}`
     
          return <a href={`/${shortLink}`} target="blank">
            <div className="">{formatted} </div>
          </a>
        },
    },
    {
        accessorKey: 'clicks',
        header: 'Clicks',
    },
    {
        accessorKey: 'customSlug',
        header: 'Custom Slug',
        cell: ({ row }) => {
          const customSlug = row.getValue("customSlug")
          const formatted = `sniplink-five.vercel.app/${customSlug}`
     
          return <div className="">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const linkDetails = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {copyToClipboard(`sniplink-five.vercel.app/${linkDetails.shortLink}`)}}
                >
                  <CopiedToast />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/dashboard/links/${linkDetails.id}/edit`}>
                    <DropdownMenuItem>Edit link</DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/links/${[linkDetails.id]}/details`}>
                  <DropdownMenuItem>View Link details</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]













