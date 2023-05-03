import { NextComponentType } from 'next'
import React, { useEffect, useState } from 'react'
import { useCandidateFetchListGame } from 'src/hooks/candidate/useCandidateFetchListGame';
import { useRecoilValue } from 'recoil';
import { candidateListGameState } from 'src/recoil/candidate/candidateListGameState';
import Game from '../game/game';
import { IN_PROGRESS, NOT_STARTED } from 'src/constants/gameConstant';
import { useRouter } from 'next/router';
import { routerConstant } from 'src/constants/routerConstant';

const ListGame: NextComponentType = () => {
    const router = useRouter()
    const { sub_link } = router.query
    const { getListGame } = useCandidateFetchListGame()
    useEffect(() => {

        if(router.isReady){
            getListGame(sub_link as string)
        }
    }, [router.isReady])
    const listGame = useRecoilValue(candidateListGameState)
    const renderListGame = () => {
        return listGame.map((game, index) => {
            return <Game key={index} info={game} />
        })
    }
    useEffect(() => {
        if (listGame.length !== 0) {
            let check = false
            listGame.forEach((game) => {
                if (game.status_text === NOT_STARTED || game.status_text === IN_PROGRESS) {
                    check = true
                }
            })
            if (!check) {
                router.push(routerConstant.candidate.doneAll)
            }
        }

    }, [listGame])
    return (
        <div >
            <h1 className='hidden md:block poppinsSemibold text-ink-500 text-32px mb-3'>Choose a test</h1>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3'>
                {renderListGame()}
            </div>
        </div>
    )
}
export default ListGame
