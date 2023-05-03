
import { useMutation } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import authApi, { ParamsArchiveAssessment } from "src/api/authApi"
import { listAssessmentsActiveState, listAssessmentsArchiveState } from "src/recoil/listAssessments"
import { useFetchListActiveAssessment, useFetchListArchiveAssessment } from "./useFetchListAssessments"
import { useLoading } from "./useLoading"

export const useUnArchiveAssessment = () => {
    const { mutate, isLoading } = useMutation((data: ParamsArchiveAssessment) => {
        return authApi.unArchiveAssessment(data)
    },{})
    const [listActiveAssessments,setListActiveAssessments]=useRecoilState(listAssessmentsActiveState)
    const [listArchiveAssessments,setListArchiveAssessments]=useRecoilState(listAssessmentsArchiveState)
    useLoading(isLoading);
    const unArchiveAss = (data: ParamsArchiveAssessment) => {
        mutate(data, {
            onSuccess: response => {
                const position=listArchiveAssessments.findIndex(assessment=>assessment.id===data.assessment_id)
                setListActiveAssessments([...listActiveAssessments,listArchiveAssessments[position]])
                setListArchiveAssessments(listArchiveAssessments.filter(assessment=>assessment.id!==data.assessment_id))
            },

        })
    }
    return {
        unArchiveAss
    }
}