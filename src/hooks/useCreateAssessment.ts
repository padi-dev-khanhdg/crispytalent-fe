import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query"
import authApi from "src/api/authApi";
import { routerConstant } from "src/constants/routerConstant";
import { useLoading } from "./useLoading";
import { handleResultApi } from "src/utils/handleResultApi";
import { useFetchListActiveAssessment } from "./useFetchListAssessments";

export const useCreateAssessment=()=>{
    const router=useRouter()
    const {fetchListActiveAssessments}=useFetchListActiveAssessment()
    const { isLoading, mutate } = useMutation((params: any) => {
        return authApi.createAssessment(params)
    });
    useLoading(isLoading)
    const createASS=(info:any)=>{
        mutate(info,{
            onSuccess:response=>{
                handleResultApi(response)
                fetchListActiveAssessments()
                router.push(routerConstant.hr.inviteAssessments(response.data.item.id))
            }
        })
    }
    return {
        createASS
    }
}