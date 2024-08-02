"use client";

import { columns } from "@/app/ui/link/column";
import { DataTable } from "@/app/ui/link/data-table";
import { LinkDetails } from "@/app/lib/definations";
import { handleGetLinks } from "@/app/lib/action";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileLink from "@/app/ui/link/mobile-links";

export default function Page() {
  const [links, setLinks] = useState<LinkDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await handleGetLinks();
        setLinks(fetchedLinks);
      } catch (error) {
        console.error("Error fetching links", error);
        setError("Error fetching links");
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchLinks();
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (error) {
    return <div className="grid place-content-center h-screen">{error}</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl">
        Links
      </h1>
      <div className="mt-10">
        <DataTable columns={columns} data={links}/>
        <MobileLink data={links} />
      </div>
    </div>
  );
}