import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const HeroSkeleton = () => {
    return (
        <section className="bg-white pt-32 pb-20">
            <div className="huntContainer flexBetween gap-16">
                <div className="md:w-1/2 w-full flex flex-col gap-5 xl:gap-8 py-6">
                    <Skeleton className="w-full h-4 rounded" />
                    <Skeleton className="w-10/12 h-4 rounded" />
                    <Skeleton className="w-32 h-8 rounded" />
                </div>

                <div className="md:w-1/2 hidden md:block">
                    <Skeleton className="w-10/12 h-full min-h-[350px] rounded" />
                </div>
            </div>
        </section>
    )
}

export default HeroSkeleton