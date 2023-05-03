
import { useMutation } from "@tanstack/react-query"
import authApi, { ParamsArchiveAssessment } from "src/api/authApi"
import { useLoading } from "./useLoading"
import { listAssessmentsActiveState, listAssessmentsArchiveState } from "src/recoil/listAssessments";
import { useRecoilState } from "recoil";
export const useArchiveAssessment = () => {
    const { mutate, isLoading } = useMutation((data: ParamsArchiveAssessment) => {
        return authApi.archiveAssessment(data)
    })
    const [listActiveAssessments,setListActiveAssessments]=useRecoilState(listAssessmentsActiveState)
    const [listArchiveAssessments,setListArchiveAssessments]=useRecoilState(listAssessmentsArchiveState)
    useLoading(isLoading);
    const archiveAss = (data: ParamsArchiveAssessment) => {
        mutate(data, {
            onSuccess: response => {
                const position=listActiveAssessments.findIndex(assessment=>assessment.id===data.assessment_id)
                setListArchiveAssessments([...listArchiveAssessments,listActiveAssessments[position]])
                setListActiveAssessments(listActiveAssessments.filter(assessment=>assessment.id!==data.assessment_id))
    
            },
        
        })
    }
    return {
        archiveAss
    }
}