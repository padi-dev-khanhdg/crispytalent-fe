import { NextComponentType } from 'next'
import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useModal } from 'src/hooks/useModal';
import uploadIcon from '../../../../assets/image/upload.svg'
import Image from 'next/image';
import { message, Select } from 'antd';
import { regexEmail } from 'src/constants/regexConstant';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailAssessmentState } from 'src/recoil/detailAssessment';
import { useCheckCandidateEmail } from 'src/hooks/candidate/useCheckCandidateEmail';
import { checkEmailAssessmentState, resetFieldListEmail } from 'src/recoil/checkEmailAssessmentRecoil';
import { useInviteCandidate } from 'src/hooks/candidate/useInviveCandidate';
interface IProps {
    role: number
}
const InvitePopup = ({ role }: any) => {
    const detail = useRecoilValue(detailAssessmentState)
    const [errorEmails, setErrorEmails] = useRecoilState(checkEmailAssessmentState)
    const reset=useRecoilValue(resetFieldListEmail)
    const [searchValue, setSearchValue] = useState<string>('')
    const [listEmail, setListEmail] = useState<Array<string>>([])
    const [error, setError] = useState<boolean>(false)
    const { invite } = useInviteCandidate()
    useEffect(() => {
        let check = false;
        if (listEmail.length !== 0) {
            listEmail.forEach(email => {
                if (!regexEmail.test(email)) {
                    check = true
                }
            })
        } else {
            check = true
        }
        handleDeleteEmailInvited()
        setError(check)

    }, [listEmail])
    useEffect(() => {
        if (listEmail.length === 0) {
            setError(true)
        }
   
    }, [])
    useEffect(()=>{
        setListEmail([])
    },[reset])
    const router = useRouter()
    const { checkEmail } = useCheckCandidateEmail()
    const { closeModal } = useModal()
    const { id } = router.query
    const { sub_link } = detail.assessment
    const customTag = (data: any) => {
        const { value } = data;
        if (regexEmail.test(value) && !errorEmails.includes(value)) {
            return <div className='poppinsRegular mr-2 px-3 py-1 bg-white-300 rounded-2xl mb-1'>{value}<button className='ml-4' onClick={() => { setListEmail(listEmail.filter(email => email !== value)) }}><CloseIcon className='text-sm' /></button></div>
        }
        return <div className='poppinsRegular mr-2 px-3 py-1 bg-white-300 rounded-2xl border border-red-500 mb-1' >{value}<button className='ml-4' onClick={() => { setListEmail(listEmail.filter(email => email !== value)) }}><CloseIcon className='text-sm' /></button></div>
    }
    const handleSearch = (value: string) => {
        setSearchValue(value)
    }
    const handleKeyDown = (keyInfo: any) => {
        const { keyCode } = keyInfo
        if (keyCode === 13 && searchValue !== '') {
            if (listEmail.findIndex(email => email === searchValue) !== -1) {
                message.warning({
                    content: '"Email is existed!"',
                    className: 'custom-message'
                })
            } else {
                setListEmail([...listEmail, searchValue])
                setSearchValue('')
            }
        }
        if (keyCode === 8 && searchValue === '' && listEmail.length > 0) {
            setListEmail(listEmail.filter(email => email !== listEmail[listEmail.length - 1]))
        }

    }
    const onSubmit = async (e: any) => {
        e.preventDefault()
        if (error) {
            return
        }
        await checkEmail({ assessment_id: Number(id), list_email: listEmail, type: role })
       

    }
    const handleCopyLink = (link: string) => {
        navigator.clipboard.writeText(link)
        message.success({
            content: 'Copied!',
            className: 'custom-message '
        });
    }
    const handleDeleteEmailInvited = () => {
        let check = false;
        errorEmails.forEach(errMail => {
            if (listEmail.findIndex(email => email === errMail) !== -1) {
                check = true
            }
        })
        if (!check) {
            setErrorEmails([])
        }
    }
    return (
        <div className='w-800px'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='mb-0 poppinsSemibold text-ink-500 text-32px'>Invite participants</h1>
                <button className='w-10 h-10 bg-white-200 rounded-full' onClick={closeModal}><CloseIcon /></button>
            </div>
            <form className='mb-60px' onSubmit={onSubmit}>
                <div className='flex items-center '>
                    <Select
                        mode="tags"
                        popupClassName="select-invite-assessments"
                        placeholder="Enter email, seperated by comma"
                        onSearch={handleSearch}
                        onInputKeyDown={handleKeyDown}
                        value={listEmail}
                        searchValue={searchValue}
                        tagRender={customTag}
                    >
                    </Select>
                    <button disabled={error || errorEmails.length !== 0 ? true : false} type='submit' className={`${error || errorEmails.length !== 0 ? "bg-primary-100" : "bg-primary-500"} ml-3 py-3 px-26px  text-white-500 rounded-lg poppinsMedium whitespace-nowrap`}>Send invite</button>
                </div>
            </form>
            <div className='mb-10'>
                <h4 className='poppinsMedium mb-3 text-ink-500'>Share your assessment link</h4>
                <div className='mb-3 flex items-center justify-between p-4 border border-white-100 rounded-lg cursor-pointer' onClick={() => { handleCopyLink(`${window.location.host}/candidate?token=${sub_link}`) }}>
                    <p className='mb-0 poppinsRegular text-ink-100'>{window.location.host}/candidate?token={sub_link}</p>
                    <button className='px-3 py-1 poppinsMedium text-primary-500'>Copy link <ContentCopyIcon className='w-3.5' /></button>
                </div>
                <span className='poppinsRegular text-ink-100 text-xs'>Only invited participants could assess the test</span>
            </div>
            <div className='flex items-center gap-3'>
                <p className='mb-0 text-ink-100 poppinsMedium'>Only invited participants could assess the test</p>
                <button className='flex items-center gap-2 py-1 px-3 poppinsMedium text-primary-500 border border-primary-300 rounded-lg'>Upload here <Image src={uploadIcon} width={24} height={24} alt="upload" /></button>
            </div>
        </div>
    )
}
export default InvitePopup