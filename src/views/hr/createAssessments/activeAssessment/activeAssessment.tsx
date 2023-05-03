import { NextComponentType } from 'next'
import React, { useEffect } from 'react'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {useRecoilValue } from 'recoil';
import { listAssessmentsActiveState, listAssessmentsArchiveState } from 'src/recoil/listAssessments';
import {Assessment} from '../assessment/assessment';
import { useModal } from 'src/hooks/useModal';
import CreateAssessment from '../createAssessment/createAssessment';
const ActiveAssessment = () => {
    const listAssessmentsActive= useRecoilValue(listAssessmentsActiveState);
    const {setting}=useModal();
    const renderListAssessmentsActive = () => {
        return listAssessmentsActive.map((assessment, index) => {
            return <Assessment key={index} info={assessment}/>
        })
    }
    const handleOpenModalCreateAssessment=()=>{
        setting(<CreateAssessment/>)
    }
    return (
        <div className='mb-20'>
            <div className='flex items-center justify-between'>
                <h1 className='poppinsSemibold text-32px text-ink-500 mb-0'>Active assessments</h1>
                <button className='flex items-center gap-2.5 p-2.5 bg-primary-500 text-white-500 poppinsMedium rounded-lg' onClick={handleOpenModalCreateAssessment}><CreateNewFolderIcon />Create new assessment</button>
            </div>
            <div className='mt-18px grid grid-cols-3 gap-10'>
                {renderListAssessmentsActive()}
            </div>
        </div>
    )
}
export default ActiveAssessment
