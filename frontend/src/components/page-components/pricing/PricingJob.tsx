"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type PropsType = {
    data: {
        plan: string;
        price: string;
        desc: string;
        features: string[];
        link: string;
    }[] | undefined
}

const PricingJob = (props: PropsType) => {
    return (
        <section className="py-20 gap-8 lg:gap-12 bg-white">
            <div className="huntContainer  flex flex-col gap-14">
                <div className="flex flex-col gap-4 md:gap-6">
                    <h1 className="huntHead">
                        Plan options for job applicants
                    </h1>
                    <p className="huntPara">
                        Morbi eget libero feugiat, ornare dolor quis, tempor nisl. Donec metus turpis, feugiat in sodales in.
                    </p>
                </div>
                {/* Top Section Ends */}

                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-6">
                    {props.data?.map((item: any) => {
                        return (
                            <div key={item.plan} className='card flex flex-col gap-8 bg-white rounded-md p-6 border-gray-200' >
                                <div className='border-b border-gray-300 pb-6  text-center '>
                                    <div className='text-purple-700 font-bold text-lg'>{item.plan}</div>
                                    <h2 className='sm:text-2xl text-xl md:text-4xl lg:text-5xl text-gray-800 font-bold'>{item.price}</h2>
                                    <p className="desc text-base font-gray-300">{item.desc}</p>
                                </div>
                                <ul className='flex flex-col gap-4'>
                                    {item.features.map((feature: string) => {
                                        return (
                                            <li key={feature} className='text-para flex gap-3'><CheckCircleIcon sx={{ fontSize: 20 }} className='text-purple-700' />{feature}</li>
                                        )
                                    })}
                                </ul>
                                <Button asChild className='bg-purple-700'>
                                    <Link href="/">Choose a Plan</Link>
                                </Button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default PricingJob
