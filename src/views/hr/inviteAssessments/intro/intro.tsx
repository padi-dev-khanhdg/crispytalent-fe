import { NextComponentType } from 'next'
import React, { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dropdown } from 'antd';
import { useRouter } from 'next/router';
import { routerConstant } from 'src/constants/routerConstant';
import { useModal } from 'src/hooks/useModal';
import InvitePopup from '../invitePopup/invitePopup';
import { useRecoilValue } from 'recoil';
import { detailAssessmentState } from 'src/recoil/detailAssessment';
import moment from 'moment';
import { roleEnum } from 'src/enum/roleEnum';
import { formatDateFull } from 'src/utils/fomatDate';
const Intro: NextComponentType = () => {
  const detail = useRecoilValue(detailAssessmentState)
  const { setting } = useModal()
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const { created_at,start_date, end_date } = detail.assessment
  const menu = (
    <div className='rounded-lg shadow-xl bg-white-500'>
      <div className='poppinsRegular text-ink-500 py-4 pl-4 cursor-pointer hover:bg-primary-100 transition-all transition-300' onClick={() => { setting(<InvitePopup role={roleEnum.CANDIDATE} />); setOpen(false) }}>Invite applicants</div>
      <div className='poppinsRegular text-ink-500 py-4 pl-4 cursor-pointer hover:bg-primary-100 transition-all transition-300' onClick={() => { setting(<InvitePopup role={roleEnum.EMPLOYEE} />); setOpen(false) }}>Invite employees</div>
    </div>
  )
  const checkEndDate = () => {
    const endDate=formatDateFull(end_date)
    if(endDate!==undefined){
      if (new Date().getTime()>=new Date(endDate).getTime()) {
        return <label className='poppinsMedium py-1 px-2 rounded-2xl bg-red-300'>End test</label>
      }
    }
 
    return <label> </label>
   
  }
  const outOfDate=()=>{
    return moment(formatDateFull(end_date)).endOf('date').from(formatDateFull(start_date))
  }
  return (
    <div className='mt-10 mb-5'>
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button className='w-10 h-10 border border-white-100 rounded-full' onClick={() => { router.push(routerConstant.hr.createAssessments) }}><KeyboardArrowLeftIcon /></button>
          <div>
            <h1 className='poppinsMedium text-xl text-ink-500 mb-1'>Assessments</h1>
            <div className='flex items-center gap-3'>
              <p className='poppinsRegular mb-0'><span className='text-ink-100 mr-2'>Date:</span>From {moment(formatDateFull(start_date)).format('LL')} to {end_date?moment(formatDateFull(end_date)).format('LL'):<AllInclusiveIcon className='text-lg mx-1'/>}  •  {end_date?`${outOfDate()}`:''}</p>
              {checkEndDate()}
            </div>
          </div>

        </div>
        <div className='flex items-center gap-3'>
          <Dropdown overlay={menu} open={open} trigger={['click']}>
            <button className='poppinsMedium py-2.5 flex items-center justify-center gap-2.5 w-263px bg-primary-500 text-white-500 rounded-lg' onClick={() => { setOpen(!open) }}><AddCircleIcon /> Invite participants</button>
          </Dropdown>
          <button className='w-11 h-11 border border-white-100 rounded-full'><MoreVertIcon /></button>
        </div>
      </div>
      <div className='h-px bg-gradient-to-r from-emerald-100/0 via-emerald-100/50 to-emerald-100/0 '></div>
    </div>
  )
}
export default Intro
