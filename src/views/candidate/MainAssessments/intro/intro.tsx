import { NextComponentType } from 'next'
import Image from 'next/image'
import React from 'react'
import Welcome from '../../../../assets/image/homepate-1.png'
const Intro: NextComponentType = () => {
    return (
        <div className='mb-3'>
            <div className='text-center block md:hidden'><Image src={Welcome} width={240} height={240}/> </div>
            <h1 className='mb-3 poppinsSemibold text-ink-500 text-xl'>Welcome to our assessment,</h1>
            <p className='poppinsRegular text-ink-500'>These are not traditional assessment tests but fun & engaging gamified challenges for you to discover yourself and explore if you are the most SUITABLE for the applying position</p>
            <p className='poppinsRegular text-ink-500'>Are you up for the challenge?</p>
            <ul className='ml-5'>
                <li className='poppinsRegular text-ink-500 list-disc mb-2'>This assessment includes [6] tests, which will take approximately [20 minutes] to accomplish</li>
                <li className='poppinsRegular text-ink-500 list-disc mb-2'> Read all the instructions carefully in each challenge.</li>
                <li className='poppinsRegular text-ink-500 list-disc mb-2'>You can turn the audio on to enter the gamified world.</li>
                <li className='poppinsRegular text-ink-500 list-disc mb-2'> Make sure you are not distracted by any other factors, stay focused and relaxed.</li>
                <li className='poppinsRegular text-ink-500 list-disc mb-2'> Do not refresh the page or close the window while playing.</li>
            </ul>
            <p className='poppinsRegular text-ink-500 '>Have fun and good luck.</p>
        </div>
    )
}
export default Intro
