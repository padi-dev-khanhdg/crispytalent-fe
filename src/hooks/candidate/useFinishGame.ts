import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import {useRecoilValue, useSetRecoilState } from "recoil"
import authApi, { ParamGameInfo } from "src/api/authApi"
import { COMPLETED, IN_PROGRESS, NOT_STARTED } from "src/constants/gameConstant"
import { routerConstant } from "src/constants/routerConstant"
import { candidateListGameState } from "src/recoil/candidate/candidateListGameState"

import { ScoreState } from "src/recoil/candidate/scoreState"



export const useFinishGame = () => {
    const setShowScore = useSetRecoilState(ScoreState)
    const router=useRouter()
    const listGame=useRecoilValue(candidateListGameState)
    const { mutate } = useMutation((data: ParamGameInfo) => {
        return authApi.finishGame(data)
    })
    const finishThisGame = (data: ParamGameInfo, totalQuestion: number) => {
        mutate(data, {
            onSuccess: response => {
                setShowScore({ status: true, score: Math.round((100 / totalQuestion) * response.data.score) })
                setTimeout(()=>{
                    const index = listGame.findIndex(game => game.id === Number(data.game_id))
                    const gameDone = { ...listGame[index], status_text: COMPLETED, status: 2 }
                    const newListGame = [...listGame.filter(game => game.id !== Number(data.game_id)), gameDone]
                    if (newListGame.length !== 0) {
                        let checkGameCanPlay = false
                        newListGame.forEach((game) => {
                            if (game.status_text === NOT_STARTED || game.status_text === IN_PROGRESS) {
                                checkGameCanPlay = true
                            }
                        })
                        if (checkGameCanPlay) {
        
                            router.push(routerConstant.candidate.mainAssessment)
                        } else {
        
                            router.push(routerConstant.candidate.done)
                        }
                    }
                }, 3000)
            }
        })
    }
    return {
        finishThisGame
    }
}