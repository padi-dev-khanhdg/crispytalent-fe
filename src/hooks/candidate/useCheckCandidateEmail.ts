import { useMutation } from "@tanstack/react-query"
import { useRecoilState, useSetRecoilState } from "recoil"
import authApi, { ParamCheckEmailCandidate } from "src/api/authApi"
import { ToastSuccess } from "src/components/common/toast"
import { checkEmailAssessmentState, resetFieldListEmail } from "src/recoil/checkEmailAssessmentRecoil"
import { useModal } from "../useModal"
import { useInviteCandidate } from "./useInviveCandidate"

export const useCheckCandidateEmail=()=>{
    const setErrorEmails=useSetRecoilState(checkEmailAssessmentState)
    const [reset,setReset]=useRecoilState(resetFieldListEmail)
    const {invite}=useInviteCandidate()
    const {closeModal}=useModal()
    const {isLoading,mutate}=useMutation((data:ParamCheckEmailCandidate)=>{
        return authApi.checkEmailCandidate(data)
    })
    const checkEmail=(data:ParamCheckEmailCandidate)=>{
        mutate(data,{
            onSuccess:response=>{
                console.log(response)
                setErrorEmails(response.data.error_emails);
                if(response.data.error_emails.length===0){
                    invite(data)
                    ToastSuccess("Invite success!")
                    setReset(!reset)
                    closeModal()
                }
            }
        })
    }
    return {
        checkEmail
    }
}