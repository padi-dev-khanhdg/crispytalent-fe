import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import authApi from "src/api/authApi";
import { ACTIVE, ARCHIVED } from "src/constants/statusAssessments";
import { listAssessmentsActiveState, listAssessmentsArchiveState } from "src/recoil/listAssessments";
import { useLoading } from "./useLoading";
export const useFetchListActiveAssessment = () => {
    const setListAssessmentsActive = useSetRecoilState(listAssessmentsActiveState);
    const { mutate, isLoading } = useMutation((status: number) => {
        return authApi.fetchListAssessments(status)
    },{cacheTime:200})
    useLoading(isLoading);
    const fetchListActiveAssessments = () => {
        mutate(ACTIVE, {
            onSuccess:  response => {
                setListAssessmentsActive(response.data.assessments)
            },
        })

    }
    return {
        fetchListActiveAssessments
    }
}
export const useFetchListArchiveAssessment = () => {
    const setListAssessmentsArchive = useSetRecoilState(listAssessmentsArchiveState);
    const { mutate, isLoading } = useMutation((status: number) => {
        return authApi.fetchListAssessments(status)
    })
    useLoading(isLoading);
    const fetchListArchiveAssessments = () => {
        mutate(ARCHIVED, {
            onSuccess:  response => {
                setListAssessmentsArchive(response.data.assessments)
            },
        })

    }
    return {
        fetchListArchiveAssessments
    }
}