import { NextComponentType } from 'next'
import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { detailAssessmentState } from 'src/recoil/detailAssessment'
import pyWelcome from '../../../../assets/image/homepate-1.png'
const Statistics: NextComponentType = () => {
    const detail = useRecoilValue(detailAssessmentState)

    const renderGame = () => {
       return detail.assessment.games.map((game, index) => {
            const {name,time}=game
            return <div key={index} className='w-52 p-3 border border-white-100 rounded-lg'>
                <h3 className='poppinsRegular text-ink-500 mb-3'>{name}</h3>
                <p className='poppinsRegular text-ink-500 mb-0'>{time}s</p>
            </div>
        })
    }
    return (
        <div>
            <h1 className='poppinsMedium text-xl text-ink-500 mb-3'>Included tests</h1>
            <div className='flex gap-2'>
                {renderGame()}
            </div>
            <div className=' mt-10 border border-white-100 rounded-2xl p-6'>
                <div className='empty flex items-center justify-center'>
                    <div className='w-400px text-center'>
                        <Image src={pyWelcome} width={320} height={320} alt="welcome" />
                        <h4 className='poppinsMedium text-ink-500'>It looks like you haven’t added any candidate</h4>
                        <p className='poppinsRegular text-ink-100'>Invite your candidates to do the assessment and track their responses here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Statistics
