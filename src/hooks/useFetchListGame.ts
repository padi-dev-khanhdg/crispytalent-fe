import { useMutation } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import authApi from "src/api/authApi"
import { listGameState } from "src/recoil/listGameState"
import { useLoading } from "./useLoading"

export const useFetchListGame = () => {
    const setListGame = useSetRecoilState(listGameState)
    const { mutate, isLoading } = useMutation(() => {
        return authApi.fetchListGame()
    })
    useLoading(isLoading)
    const fetchListGame = () => {
        mutate(undefined, {
            onSuccess: response => {
                setListGame(response.data.games)
            }
        })
    }
    return {
        fetchListGame
    }
}