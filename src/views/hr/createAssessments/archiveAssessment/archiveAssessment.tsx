import { NextComponentType } from 'next'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { listAssessmentsArchiveState } from 'src/recoil/listAssessments';
import { AssessmentArchive } from '../assessment/assessment';
import { useModal } from 'src/hooks/useModal';
const ArchiveAssessment: NextComponentType = () => {
    const listAssessmentsArchive = useRecoilValue(listAssessmentsArchiveState);
    const { setting } = useModal();
    const renderAssessmentArchives = () => {
        return listAssessmentsArchive.map((assessment, index) => {
            return <AssessmentArchive key={index} info={assessment} />
        })
    }
    return (
        <div>
            <h1 className='poppinsSemibold text-32px text-ink-500 mb-0'>Archive assessments</h1>
            <div className='mt-18px grid grid-cols-3 gap-10'>
                {renderAssessmentArchives()}
            </div>
        </div>
    )
}
export default ArchiveAssessment
