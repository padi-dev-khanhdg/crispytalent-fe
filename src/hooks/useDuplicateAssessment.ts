import {useFetchListActiveAssessment} from './useFetchListAssessments'
import { useMutation } from "@tanstack/react-query"
import authApi, {ParamsDuplicateAssessment } from "src/api/authApi"
import { useLoading } from "./useLoading"
export const useDuplicateAssessment = () => {
    const {fetchListActiveAssessments}= useFetchListActiveAssessment()
    const { mutate, isLoading } = useMutation((data: ParamsDuplicateAssessment) => {
        return authApi.duplicateAssessment(data)
    })
    const copyAss = (data: ParamsDuplicateAssessment) => {
        mutate(data, {
            onSuccess: response => {
                fetchListActiveAssessments()
            },
        
        })
    }
    return {
        copyAss
    }
}