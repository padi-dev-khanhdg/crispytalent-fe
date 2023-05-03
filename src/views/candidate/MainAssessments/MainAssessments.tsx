import { NextComponentType } from 'next'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { listTestMobileState } from 'src/recoil/candidate/listTestMobileState'
import SelectTestView from '../SelectTest/SelectTest'
import Intro from './intro/intro'
import ListGame from './ListGames/ListGame'

const MainAssessments: NextComponentType = () => {
    const setOpen=useSetRecoilState(listTestMobileState)
    return (
        <div className='mt-0 md:mt-10 p-4 md:pb-24 md:px-120px'>
            <Intro />
            <div className='hidden md:block'>
                <ListGame />
            </div>
            <SelectTestView/>
            <button className='block md:hidden mt-8 w-full py-2.5 poppinsMedium text-white-500 bg-primary-500 rounded-lg' onClick={()=>{
                setOpen(true)
            }}>View assessment</button>
        </div>
    )
}
export default MainAssessments
