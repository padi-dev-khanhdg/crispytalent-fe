import { NextComponentType } from 'next'
import Image from 'next/image'
import React from 'react'
import py_welcome from '../../assets/image/homepate-1.png'
const PageNotFound: NextComponentType = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='text-center'>
                <Image src={py_welcome} width={400} height={400} alt="welcome" />
                <h3 className='mt-10 poppinsSemibold text-2xl'>Oops! Somethings went wrong.</h3>
                <p className='mt-6 mb-66px poppinsMedium text-xl w-600px'>This page is currently unavailable. Don’t worry, we are working on the problem. Thank you for your patience!</p>
                <button className='w-400px py-2.5 bg-primary-500 poppinsMedium text-white-500 rounded-lg'>Back to homepage</button>
            </div>
        </div>
    )
}
export default PageNotFound
