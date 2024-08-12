import { Skeleton } from "@/components/ui/skeleton";


export function CardsSkeleton() {
  return (
    <>
        <CardSkeleton />
        <CardSkeleton />
    </>
  );
}

export function RecentLinksSkeleton() {
    return (
        <div className="z-10">
            <Skeleton className="h-10 w-[200px]" />
            <RecentLinkSkeleton />
            <RecentLinkSkeleton />
            <RecentLinkSkeleton />
            <RecentLinkSkeleton />
            <RecentLinkSkeleton />
        </div>
    );
}

export function CardSkeleton() {
    return (
        <Skeleton className="h-[60px] md:h-[112px] w-full" />
    );
}

export function ChartSkeleton() {
    return(
        <div className="h-[400px] w-full">
            <Skeleton className="h-full w-full" />
        </div>
    )
}

export function RecentLinkSkeleton() {
    return (
        <div className="border-b-2 pb-2 mt-10">
            <Skeleton className="h-6 w-[200px]" />
            <div className="flex md:gap-10 gap-6 mt-2">
                <Skeleton className=":h-3 w-[200px]" />
                <Skeleton className="h-6 w-[30px]" />
            </div>
        </div>
    );
}



export function DatasTableSkeleton() {
    return(
        <DataTableSkeleton />
    )
}



export function DataTableSkeleton() {
    return (
        <div className="hidden md:block">
            <div className="flex items-center py-4">
                <div className="w-full flex gap-4">
                    <div className="w-1/3">
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="w-1/3">
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="w-1/3">
                        <Skeleton className="h-6 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}


