import { NextComponentType } from 'next'
import React, { useState, FunctionComponent } from 'react'
import EastIcon from '@mui/icons-material/East';
import Vector from '../../../../assets/image/Vector.svg'
import Line from '../../../../assets/image/line.svg'
import iconEye from '../../../../assets/image/eye.svg'
import copyLight from '../../../../assets/image/copyLight.svg'
import iconArchive from '../../../../assets/image/archive.svg'
import iconTrash from '../../../../assets/image/trash.svg'
import Image from 'next/image';
import { message, Tooltip } from 'antd';
import moment from 'moment';
import { IAssessments } from 'src/recoil/listAssessments';
import { useModal } from 'src/hooks/useModal';
import { useDeleteAssessment } from 'src/hooks/useDeleteAssessment';
import { useArchiveAssessment } from 'src/hooks/useArchiveAssessment';
import { useUnArchiveAssessment } from 'src/hooks/useUnArchiveAssessment';
import { useRouter } from 'next/router';
import { routerConstant } from 'src/constants/routerConstant';
import { DeleteView } from 'src/components/common/Delete';
import { useDuplicateAssessment } from 'src/hooks/useDuplicateAssessment';
import { formatDateFull } from 'src/utils/fomatDate';

export const Assessment= ({ info }:any) => {
    const router = useRouter()
    const [scale, setScale] = useState<boolean>(false);
    const { id, name, candidates_count, updated_at, end_date } = info;
    const { archiveAss } = useArchiveAssessment()
    const { deleteAss } = useDeleteAssessment()
    const {copyAss}=useDuplicateAssessment()
    const { setting } = useModal();
    const onScale = () => {
        setScale(true)
    }
    const closeScale = () => {
        setScale(false)
    }
    const checkEndDate = () => {
        const endDate=formatDateFull(end_date)
        if(endDate!==undefined){
          if (new Date().getTime()>=new Date(endDate).getTime()) {
            return <label className='poppinsRegular py-1 px-2 rounded-2xl bg-red-300'>End test</label>
          }
        }
        return <label> </label>
       
      }
    const handleCopy = () => {
        copyAss({assessment_id:id})
        message.success({
            content: 'Copied!',
            className: 'custom-message '
        });
    }
    return (
        <div className='relative w-285px h-285px border border-ink-100 rounded-2xl cursor-pointer overflow-hidden' onMouseEnter={onScale} onMouseLeave={closeScale}>
            <div className='relative w-full h-full p-5' onClick={() => { router.push(routerConstant.hr.inviteAssessments(id)) }}>
                <div className={`${scale ? "scale-600" : ""} absolute -top-3 left-0 transition-scale duration-300`}><Image src={Vector} objectFit="cover" alt="banner" /></div>
                <div className='absolute bottom-8%'>
                    {checkEndDate()}
                    <div className='relative pb-2 my-2'>
                        <h3 className='poppinsMedium text-xl text-ink-500 mb-0'>{name}</h3>
                        <div className='absolute bottom-0 w-full h-px'><Image src={Line} height={2} layout="fill" alt="line" /></div>
                    </div>
                    <div className='poppinsRegular text-xs mb-2'><span className='mr-2'>Number of participants:</span><span className='poppinsSemibold'>{candidates_count}</span></div>
                    <div className='poppinsRegular text-xs mb-2'><span className='mr-2'>Last activity:</span><span className='poppinsSemibold'>{moment(updated_at, "DD").fromNow()}</span></div>
                    <button className='pr-3 py-1 poppinsMedium text-primary-500'>Details <span><EastIcon /></span></button>
                </div>
            </div>
            <div className={`${scale ? "scale-100" : "scale-0"} absolute top-6 right-6 flex items-center gap-2.5 transition-scale duration-300`}>
                <Tooltip placement="right" arrowPointAtCenter={true} color='white' title={<span className='poppinsMedium text-xs text-ink-500'>Archive assessment</span>}>
                    <button onClick={() => { archiveAss({ assessment_id: id }) }}><Image src={iconArchive} alt="icon archive" /></button>
                </Tooltip>
                <Tooltip placement="right" arrowPointAtCenter={true} color='white' title={<span className='poppinsMedium text-xs text-ink-500'>Delete assessment</span>}>
                    <button onClick={() => { setting(<DeleteView title='Delete assessment' content='Are you sure you wish to delete this assessment and its content?' callbackFunction={() => { deleteAss({ assessment_id: id }) }} />) }}><Image src={iconTrash} alt="icon trash" /></button>
                </Tooltip>
            </div>
        </div>
    )
}
export const AssessmentArchive = ({ info }: any) => {
    const router = useRouter()
    const [scale, setScale] = useState<boolean>(false);
    const { id, name, candidates_count, updated_at, end_date } = info;
    const { unArchiveAss } = useUnArchiveAssessment()
    const onScale = () => {
        setScale(true)
    }
    const closeScale = () => {
        setScale(false)
    }
    const checkEndDate = () => {
        const endDate=formatDateFull(end_date)
        if(endDate!==undefined){
          if (new Date().getTime()>=new Date(endDate).getTime()) {
            return <label className='poppinsRegular py-1 px-2 rounded-2xl bg-red-300'>End test</label>
          }
        }
     
        return <label> </label>
       
      }
    return (
        <div className='relative w-285px h-285px bg-white-400 border border-ink-100 rounded-2xl cursor-pointer overflow-hidden' onMouseEnter={onScale} onMouseLeave={closeScale}>
            <div className='relative w-full h-full p-5' onClick={() => { router.push(routerConstant.hr.inviteAssessments(id)) }}>
                <div className={`${scale ? "scale-600" : ""} absolute -top-3 left-0 transition-scale duration-300`}><Image src={Vector} objectFit="cover" alt="banner" /></div>
                <div className='absolute bottom-8%'>
                    {checkEndDate()}
                    <div className='relative pb-2 my-2'>
                        <h3 className='poppinsMedium text-xl text-ink-100 mb-0'>{name}</h3>
                        <div className='absolute bottom-0 w-full h-px'><Image src={Line} height={2} layout="fill" alt="line" /></div>
                    </div>
                    <div className='poppinsRegular text-xs mb-2 text-ink-100'><span className='mr-2'>Number of participants:</span><span className='poppinsSemibold'>{candidates_count}</span></div>
                    <div className='poppinsRegular text-xs mb-2 text-ink-100'><span className='mr-2'>Last activity:</span><span className='poppinsSemibold'>{moment(updated_at, "DD").fromNow()}</span></div>

                </div>

            </div>
            <div className={`${scale ? "scale-100" : "scale-0"} absolute top-6 right-6 flex items-center gap-2.5 transition-scale duration-300`}>
                <Tooltip placement="right" arrowPointAtCenter={true} color='white' title={<span className='poppinsMedium text-xs text-ink-500'>unArchive assessment</span>}>
                    <button onClick={() => { unArchiveAss({ assessment_id: id }) }}><Image src={iconArchive} alt="icon archive" /></button>
                </Tooltip>

            </div>
        </div>
    )
}

