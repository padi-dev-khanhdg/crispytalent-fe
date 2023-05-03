import {useMutation} from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import authApi from 'src/api/authApi'
import { detailAssessmentState } from 'src/recoil/detailAssessment'
import { useLoading } from './useLoading'
export const useFetchDetailAssessment=()=>{
    const setDetailAssessment=useSetRecoilState(detailAssessmentState);
    const {isLoading,mutate}=useMutation((assessment_id:number|string|any)=>{
        return authApi.fetchDetailAssessment(assessment_id)
    })
    useLoading(isLoading)
    const getDetail=(assessment_id:number|string|any)=>{
        mutate(assessment_id,{
            onSuccess:response=>{
                setDetailAssessment(response.data)
            }
        })
    }
    return {
        getDetail
    }
}