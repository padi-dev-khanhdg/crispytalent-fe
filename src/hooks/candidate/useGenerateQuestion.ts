import { useMutation } from "@tanstack/react-query"
import {useSetRecoilState } from "recoil"
import authApi, { ParamGameInfo } from "src/api/authApi"
import { generateQuestionState } from "src/recoil/candidate/generateQuestionState"

export const useGenerateQuestion=()=>{
    const setGenerateQuestion=useSetRecoilState(generateQuestionState)
    const {mutate}=useMutation((data:{sub_link: string, test_id: string})=>{
        return authApi.fetchGenerateQuestion(data.sub_link,data.test_id)
    })
    const getQuestion=(sub_link: string, test_id: string)=>{
        mutate({sub_link,test_id},{
            onSuccess:response=>{
                setGenerateQuestion(response.data)              
            }
        })
    }
    return {
        getQuestion
    }
}