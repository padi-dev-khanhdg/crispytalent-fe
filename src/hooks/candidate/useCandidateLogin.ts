import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import authApi, { ParamCandidateLogin } from "src/api/authApi"
import { routerConstant } from "src/constants/routerConstant"
import { addCookieCandidate } from "src/utils/addCookie"
import { handleResultApi } from "src/utils/handleResultApi"
import Cookies from "universal-cookie"
export interface ICandidateLogin{
    token:any
    candidateInfo:{email:string}
    sub_link: string
}
export const useCandidateLogin=()=>{
    const router=useRouter()
    const cookies=new Cookies()
    const {mutate}=useMutation((data:ICandidateLogin)=>{
        return authApi.candidateLogin(data.token,data.candidateInfo)
    })
    const executeLogin=(data:ICandidateLogin)=>{
        mutate(data,{
            onSuccess:response=>{
                handleResultApi(response)
                addCookieCandidate(response.data.access_token)
                cookies.set('name_candidate',response.data.email)
                router.push(routerConstant.candidate.mainAssessment(data.sub_link))
            },
            onError:response=>{
                
            }
            
        })
    }
    return{
        executeLogin
    }
}