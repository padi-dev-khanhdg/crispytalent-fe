import { NextComponentType } from 'next'
import React, { useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ICandidateGame } from 'src/recoil/candidate/candidateListGameState';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { routerConstant } from 'src/constants/routerConstant';
import { ToastCompleteTest, ToastSuccess } from 'src/components/common/toast';
interface Iprops {
    info: ICandidateGame
}
const Game = ({ info }: Iprops) => {
    const [scale, setScale] = useState<boolean>(false)
    const router = useRouter()
    const { sub_link } = router.query
    const handleScale = () => {
        setScale(!scale)
    }
    const { id, score, status_text, status, image_cover, time, name } = info
    let statusClass = 'bg-orange-300'
    if (status === 1) {
        statusClass = "bg-red-300"
    }
    if (status === 2) {
        statusClass = "bg-green-300"
    }
    const handleChangePage = () => {
        if(status===2){
            ToastCompleteTest("You have completed this test!")
        }else{
            router.push(routerConstant.candidate.introGame(id,sub_link))
        }
       
    }
    return <div className='relative w-full flex gap-4 items-center md:block md:w-48 md:h-276px lg:w-full p-2 md:p-3 border border-white-100 rounded-xl cursor-pointer' onMouseEnter={handleScale} onMouseLeave={handleScale} onClick={handleChangePage}>
        <div className='hidden md:block lg:text-center'><Image src={image_cover} width={166} height={160} alt="image_cover" /></div>
        <div className='block md:hidden'><Image src={image_cover} width={80} height={80} alt="image_cover" /></div>
        <div className='relative md:absolute flex md:block p-0 md:p-3 left-0 bottom-0 w-full'>
            <div>
                <h3 className='poppinsMedium text-ink-500 mb-2 '>{name}</h3>
                <div className='flex items-center gap-10  md:block'>
                    <div className='flex items-center gap-3 justify-between md:mb-2'>
                        <span className={`flex items-center poppinsRegular text-ink-500 text-sm ${scale ? 'scale-1' : 'scale-0'}  transition-all duration-300`}><AccessTimeIcon className='text-ink-100' /> {time}s</span>
                        <span className={`poppinsRegular text-ink-500 text-sm ${scale ? 'scale-1' : 'scale-0'}  transition-all duration-300`}><EmojiEventsIcon className='text-ink-100' /> {score}</span>
                    </div>
                    <div className={`w-24 poppinsMedium text-xs py-1 px-3 ${statusClass}  rounded-full`}>{status_text}</div>
                </div>
            </div>

        </div>
    </div>
}
export default Game