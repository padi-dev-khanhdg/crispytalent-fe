import { useMutation } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import authApi, { ParamInfoAssessment } from "src/api/authApi"
import { infoAssessmentState } from "src/recoil/candidate/infoAssessmentState"
import { useLoading } from "../useLoading"

export const useInfoAssessment=()=>{
    const setInfoAssessment=useSetRecoilState(infoAssessmentState)
    const {isLoading,mutate}=useMutation((data:ParamInfoAssessment)=>{
        return authApi.infoAssessment(data)
    })
    useLoading(isLoading)
    const getInfoAssessment=(data:any)=>{
       
        mutate(data,{
            onSuccess:response=>{
                setInfoAssessment(response.data)
            }
        })
    }
    return {
        getInfoAssessment
    }
}