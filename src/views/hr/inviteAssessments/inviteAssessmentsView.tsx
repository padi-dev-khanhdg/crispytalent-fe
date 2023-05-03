import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import React,{useEffect} from 'react'
import { useFetchDetailAssessment } from 'src/hooks/useFetchDetailAssessment'
import Intro from './intro/intro'
import Statistics from './statistics/statistics'

const InviteAssessmentsView:NextComponentType=()=> {
  const router=useRouter()
  const {id}=router.query
  const {getDetail}=useFetchDetailAssessment()
  useEffect(() => {
    if(router.isReady){
      getDetail(Number(id))
    }
  }, [router.isReady])
  
  return (
    <div className='px-60px'>
        <Intro/>
        <Statistics/>
    </div>
  )
}
export default InviteAssessmentsView
