import React from 'react'
import PricingCompany from '@/components/page-components/pricing/PricingCompany'
import { PricingCompanyData } from '@/data/pricingCompanyData'
import { PricingJobData } from '@/data/pricingJobData'
import PricingJob from '@/components/page-components/pricing/PricingJob'

const page = () => {
    return (
        <div className='flex flex-col pt-10'>
            <PricingCompany data={PricingCompanyData} />
            <PricingJob data={PricingJobData} />
        </div>
    )
}

export default page