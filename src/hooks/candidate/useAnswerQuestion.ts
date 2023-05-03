import { useMutation } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import authApi, { ParamAnswerQuestion } from "src/api/authApi"
import { generateQuestionState } from "src/recoil/candidate/generateQuestionState"
import { useCheckCorrectAndError } from "./useCheckCorrectAndError"
import { useFinishGame } from "./useFinishGame"


export const useAnswerQuestion = () => {
    const { finishThisGame } = useFinishGame()
    const { checkCorrect, checkWrong } = useCheckCorrectAndError()
    const setGenerateQuestion = useSetRecoilState(generateQuestionState)
    const { mutate } = useMutation((data:{data: ParamAnswerQuestion,sub_link: string, test_id: string}) => {
        return authApi.answerQuestion(data.data,data.sub_link,data.test_id)
    })
    const answerQuestion = (data: ParamAnswerQuestion,sub_link: string, test_id: string,totalQuestion:number) => {
        mutate({data,sub_link,test_id}, {
            onSuccess: response => {
                if (response.data.result === 1) {
                    checkCorrect()
                } else if (response.data.result === 0) {
                    checkWrong()
                }
                if(response.data.game_ended){
                    finishThisGame({game_id:data.game_id,sub_link},totalQuestion)
                }

                setGenerateQuestion(response.data)   

            }
        })
    }
    return {
        answerQuestion
    }
}