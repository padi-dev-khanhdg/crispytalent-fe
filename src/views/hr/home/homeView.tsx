import { NextComponentType } from 'next'
import Image from 'next/image'
import React from 'react'
import homepate1 from '../../../assets/image/homepate-1.png'
const HrHomeView: NextComponentType = () => {
  return (
    <div className='mx-120px mt-72px'>
      <div className='flex items-center'>
        <div className='flex-1'>
          <h1 className='poppinsSemibold text-7xl mb-5 text-ink-500'>
            Hire the best.
            No bias. No stress.
          </h1>
          <p className='text-lg poppinsRegular text-ink-500'>Our screening tests identify the best participantss and make your hiring decisions faster, easier, and bias-free.</p>
        </div>
        <div className='flex-1'>
          <Image src={homepate1} width={600} height={600} alt="homepate" />
        </div>
      </div>
    </div>
  )
}
export default HrHomeView
