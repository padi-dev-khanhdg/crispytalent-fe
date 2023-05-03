import { useMutation } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import authApi from "src/api/authApi"
import { candidateListGameState } from "src/recoil/candidate/candidateListGameState"

import { useLoading } from "../useLoading"


export const useCandidateFetchListGame = () => {
    const setListGame = useSetRecoilState(candidateListGameState)
    const { mutate, isLoading } = useMutation((sub_link: string) => {
        return authApi.candidateListGame(sub_link)
    })
    useLoading(isLoading)
    const getListGame = (sub_link: string) => {
        mutate(sub_link, {
            onSuccess: response => {
                setListGame(response.data)
            }
        })
    }
    return {
        getListGame
    }
}