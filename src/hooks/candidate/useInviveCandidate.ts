import { useMutation } from "@tanstack/react-query"
import authApi, { ParamInviteCandidate } from "src/api/authApi"
import { handleResultApi } from "src/utils/handleResultApi"

export const useInviteCandidate=()=>{
    const {isLoading,mutate}=useMutation((data:ParamInviteCandidate)=>{
        return authApi.inviteCandidate(data)
    })
    const invite=(data:ParamInviteCandidate)=>{
        mutate(data,{
            onSuccess:response=>{
           
              
            }
        })
    }
    return {
        invite
    }
}