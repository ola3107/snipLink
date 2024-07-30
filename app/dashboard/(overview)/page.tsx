
import CardWrapper from '../../ui/dashboard/card'
import RecentLink from '../../ui/dashboard/recent-link'




export default function Page() {
    return (
        <div className='mb-16'>
           <h1 className='text-3xl font-bold'>
                Dashboard
           </h1>
           <div className='grid gap-6 md:gap-10 grid-cols-2 mt-4'>
                <CardWrapper />
           </div>
           <div className='mt-10'>
                <RecentLink />
           </div>
        </div>
    )
}