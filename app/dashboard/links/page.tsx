"use client";

import { columns } from "@/app/ui/link/column";
import { DataTable } from "@/app/ui/link/data-table";
import { handleGetLinks } from "@/app/lib/action";
import MobileLink from "@/app/ui/link/mobile-links";
import { Suspense } from "react";
import { DatasTableSkeleton } from "@/app/ui/skeleton";

export default async function Page() {
  const links = await handleGetLinks();
  const ascLink = links.sort((a,b) => b.createdAt?.toDate()?.getTime() - a.createdAt?.toDate()?.getTime() );
  
  return (
    <div>
      <h1 className="font-bold text-3xl">
        Links
      </h1>
      <div className="mt-10">
        <Suspense fallback={<DatasTableSkeleton />}>
          <DataTable columns={columns} data={ascLink}/>
        </Suspense>
        <Suspense fallback={<DatasTableSkeleton />}>
          <MobileLink data={ascLink} />
        </Suspense>
      </div>
    </div>
  );
}