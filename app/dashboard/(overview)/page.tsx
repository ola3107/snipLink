
import CardWrapper from '../../ui/dashboard/card'
import RecentLink from '../../ui/dashboard/recent-link'
import { Suspense } from 'react'
import { CardsSkeleton, RecentLinksSkeleton} from '@/app/ui/skeleton'




export default function Page() {
    return (
        <div className='mb-14'>
           <h1 className='text-3xl font-bold'>
                Dashboard
           </h1>
           <div className='grid gap-6 md:gap-10 grid-cols-2 mt-4 w-full'>
               <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
               </Suspense>
           </div>
           <div className='mt-10'>
               <Suspense fallback={<RecentLinksSkeleton />}>
                    <RecentLink/>
               </Suspense>
           </div>
        </div>
    )
}