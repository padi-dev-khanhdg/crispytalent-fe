import { NextComponentType } from 'next'
import React from 'react'
import ListGame from '../MainAssessments/ListGames/ListGame'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRecoilState } from 'recoil';
import { listTestMobileState } from 'src/recoil/candidate/listTestMobileState';

const SelectTestView: NextComponentType = () => {
    const [open,setOpen]=useRecoilState(listTestMobileState)
    return (
        <div className={`mt-0 fixed top-0 left-0 w-full h-full bg-white-500 block md:hidden py-4 md:mt-10 md:pb-24 md:px-120px ${open?'translate-x-0':'translate-x-full'} transition-all duration-300`}>
            <h1 className='poppinsMedium text-ink-500 text-xl text-center mb-4 block md:hidden'>Select test</h1>
            <button className='absolute top-5 left-4 flex items-center gap-3 poppinsMedium text-base' onClick={() => {setOpen(false) }}><KeyboardDoubleArrowRightIcon className='w-12 h-12 border rounded-full text-ink-100 ' /> </button>
            <div className='p-4'>
                <ListGame />
            </div>
        </div>
    )
}
export default SelectTestView
