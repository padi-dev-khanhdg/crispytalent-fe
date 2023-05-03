import { NextComponentType } from 'next'
import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import WestIcon from '@mui/icons-material/West';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { routerConstant } from 'src/constants/routerConstant';
import { candidateListGameState, gameCurrentState } from 'src/recoil/candidate/candidateListGameState';
import { useCandidateFetchListGame } from 'src/hooks/candidate/useCandidateFetchListGame';
import { motion } from 'framer-motion'
import { useGenerateQuestion } from 'src/hooks/candidate/useGenerateQuestion';
import { playAudio } from 'src/utils/play';
import { IN_PROGRESS, NOT_STARTED } from 'src/constants/gameConstant';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const IntroductionGame: NextComponentType = () => {
    const [mask, setMask] = useState<boolean>(false)
    const [currentGame, setCurrentGame] = useRecoilState(gameCurrentState)
    const { getQuestion } = useGenerateQuestion()
    const [openCountDown, setOpenCountDown] = useState<boolean>(false)
    const router = useRouter()
    const { getListGame } = useCandidateFetchListGame()
    const listGame = useRecoilValue(candidateListGameState)
    const { game_id, sub_link} = router.query
    useEffect(() => {
        if(router.isReady){
            getListGame(sub_link as string)  
        }
    }, [router.isReady])
    useEffect(() => {
        const index = listGame.findIndex(game => game.id === Number(game_id))
        if (index !== -1) {
            setCurrentGame(listGame[index])
        }
    }, [listGame])
    const handleClickStart = () => {
        playAudio('/audio/SoundStart.mp3').then(() => {
            setOpenCountDown(true)
            getQuestion(sub_link as string, game_id as string)
            setTimeout(() => {
                setOpenCountDown(false)
                setMask(true)
                router.push(routerConstant.candidate.playGame(currentGame.id, sub_link as string))
            }, 5000)
        })

    }


    return (
        <div className='h-screen p-4 md:px-120px'>
            <div className='my-4 md:my-60px mb-4'>
                <button className='hidden md:flex items-center gap-3 poppinsMedium text-base' onClick={() => { router.push(routerConstant.candidate.mainAssessment) }}><KeyboardArrowLeftIcon className='w-10 h-10  rounded-full text-primary-500 bg-white-100' /> Back to assessment</button>
                <button className='block md:hidden poppinsMedium text-base' onClick={() => { router.push(routerConstant.candidate.mainAssessment) }}><WestIcon className='text-ink-500' /></button>
            </div>
            <div className='flex justify-center'>
                <div className='w-600px'>
                    <div className='text-center'><img className='mx-auto' src={currentGame.image_cover} width={300} height={300} alt='image_cover1' /></div>
                    <div className='mt-6'>
                        <h1 className='mb-5 poppinsSemibold text-xl sm:text-32px text-center text-ink-500'>{currentGame?.name}</h1>
                        <p className='poppinsRegular text-ink-500 text-center mb-5'>{currentGame.description}</p>
                        {currentGame.status_text === IN_PROGRESS ? <div className='p-3 bg-white-200 rounded-xl text-ink-500 flex items-center gap-3 mb-10'>
                            <ErrorOutlineIcon />
                            <div>
                                <p className='mb-0 poppinsRegular text-base'>{'Your test is in progress. Crispy has logged your score so far &'}</p>
                                <p className='mb-0 poppinsRegular text-base'> remaining time. Click Continue to finish the test.</p>
                            </div>
                        </div> : <></>}
                        <button className='text-white-500 bg-primary-500 rounded-lg w-full py-2.5 poppinsMedium outline-none' onClick={handleClickStart}>{currentGame.status_text === NOT_STARTED ? 'Start' : 'Continue'}</button>
                    </div>
                </div>
            </div>
            {openCountDown ? <CountDown /> : ''}
            <div className={`fixed top-0 left-0 w-screen h-screen bg-white-500 ${mask ? 'block' : 'hidden'}`}></div>
        </div>
    )
}
export default IntroductionGame

const CountDown = () => {
    const [showCountDown, setShowCountDown] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCountDown(true)
        }, 1500)
        return () => {
            clearTimeout(timer)
        }
    }, [])
    return <div
        className='fixed top-0 w-screen h-screen left-0 flex items-center justify-center '>
        <motion.div animate={{ scale: [0, 1], width: ['0%', '100%'], height: ['0%', '100%'], borderRadius: ['100%', '0%'] }}
            className=' w-full h-full bg-white-500  flex items-center justify-center '>
            <div className='rounded-full overflow-hidden w-200px h-200px md:w-500px md:h-500px'>
                {showCountDown ? <video autoPlay src='/countdown.mp4' /> : ''}

            </div>
        </motion.div>

    </div>
}
