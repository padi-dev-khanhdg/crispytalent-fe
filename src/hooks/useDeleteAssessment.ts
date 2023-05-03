import { useMutation } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import authApi, { ParamsDeleteAssessment } from "src/api/authApi"
import { listAssessmentsActiveState, listAssessmentsArchiveState } from "src/recoil/listAssessments"
import { handleResultApi } from "src/utils/handleResultApi"
export const useDeleteAssessment = () => {
    const { mutate, isLoading } = useMutation((data: ParamsDeleteAssessment) => {
        return authApi.deleteAssessment(data)
    })
   
    const [listActiveAssessments, setListActiveAssessments] = useRecoilState(listAssessmentsActiveState)
    const [listArchiveAssessments, setListArchiveAssessments] = useRecoilState(listAssessmentsArchiveState)
    const deleteAss = (data: ParamsDeleteAssessment) => {
        mutate(data, {
            onSuccess: response => {
                const activeAss = listActiveAssessments.findIndex(assessment => assessment.id === data.assessment_id)
                const archiveAss = listArchiveAssessments.findIndex(assessment => assessment.id === data.assessment_id)
                if (activeAss !== -1) {
                    setListActiveAssessments(listActiveAssessments.filter(assessment => assessment.id !== listActiveAssessments[activeAss].id))
                }
                if (archiveAss !== -1) {
                    setListArchiveAssessments(listArchiveAssessments.filter(assessment => assessment.id !== listArchiveAssessments[archiveAss].id))
                }
                handleResultApi(response)

            }
        })
    }
    return {
        deleteAss
    }
}