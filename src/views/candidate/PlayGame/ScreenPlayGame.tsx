import { NextComponentType } from 'next'
import React, { useEffect, useState } from 'react'
import Verbal from './Verbal/Verbal'
import { useRecoilValue } from 'recoil';
import { gameCurrentState } from 'src/recoil/candidate/candidateListGameState';
import { useRouter } from 'next/router';
import CorrectAndError from 'src/components/common/CorrectAndError';
import { useGenerateQuestion } from 'src/hooks/candidate/useGenerateQuestion';
import Score from './score/Score';
import { ScoreState } from 'src/recoil/candidate/scoreState';
import { MEMORY, VERBAL } from 'src/constants/gameConstant';

const ScreenPlayGame: NextComponentType = () => {
    const currentGame = useRecoilValue(gameCurrentState)
    const showScore=useRecoilValue(ScoreState)
    const { getQuestion } = useGenerateQuestion()
    const router = useRouter()
    const {name}=currentGame
    const showTest=()=>{
        if(name===VERBAL){
            return <Verbal />
        }else{
            return <></>
        }
      
    }
    useEffect(() => {
        if(router.isReady){
            const { game_id, sub_link } = router.query
            getQuestion(sub_link as string, game_id as string)
        }
    }, [router.isReady])
    return (
        <div className='fixed top-0 left-0 w-screen h-screen p-4 md:relative md:w-1000px md:h-800px md:px-100px md:pt-10 border border-primary-500 md:rounded-xl bg-white-500 overflow-hidden'>
            {showTest()}
            <CorrectAndError />
            {showScore.status?<Score/>:<> </>}
        </div>

    )
}
export default ScreenPlayGame