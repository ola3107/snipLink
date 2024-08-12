
import CardWrapper from '../../ui/dashboard/card'
import RecentLinks from '../../ui/dashboard/recent-link'
import Chart from '@/app/ui/dashboard/chart'
import { Suspense } from 'react'
import { CardsSkeleton, RecentLinksSkeleton, ChartSkeleton} from '@/app/ui/skeleton'




export default function Page() {
    return (
        <div className='mb-32 md:mb-10'>
           <h1 className='text-3xl font-bold'>
                Dashboard
           </h1>
           <div className='grid gap-6 md:gap-10 grid-cols-2 mt-4 w-full'>
               <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
               </Suspense>
           </div>
           <div className='mt-10 flex flex-col md:flex-row gap-10'>
                <div className="flex-1 ">
                    <Suspense fallback={<ChartSkeleton />}>
                        <Chart />
                    </Suspense>
                </div>
                <div className='flex-1'>
                    <Suspense fallback={<RecentLinksSkeleton/>}>
                            <RecentLinks/>
                    </Suspense>
                </div>
           </div>
        </div>
    )
}