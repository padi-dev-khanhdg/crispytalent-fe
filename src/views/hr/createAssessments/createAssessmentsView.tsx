import { NextComponentType } from 'next'
import React, { useEffect } from 'react'
import { useFetchListActiveAssessment, useFetchListArchiveAssessment } from 'src/hooks/useFetchListAssessments';
import { useFetchListGame } from 'src/hooks/useFetchListGame';
import ActiveAssessment from './activeAssessment/activeAssessment';
import ArchiveAssessment from './archiveAssessment/archiveAssessment';
const CrateAssessmentsView: NextComponentType = () => {
  const {fetchListGame}=useFetchListGame()
  const {fetchListActiveAssessments}=useFetchListActiveAssessment()
  const {fetchListArchiveAssessments}=useFetchListArchiveAssessment()
  useEffect(()=>{
    fetchListGame()
    fetchListActiveAssessments()
    fetchListArchiveAssessments()
  },[])
  return (
    <div className='px-24 mt-10'>
      <ActiveAssessment />
      <ArchiveAssessment/>
    </div>
  )
}
export default CrateAssessmentsView
