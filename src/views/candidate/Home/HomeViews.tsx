import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { regexEmail } from 'src/constants/regexConstant'
import { useCandidateLogin } from 'src/hooks/candidate/useCandidateLogin'
import { useInfoAssessment } from 'src/hooks/candidate/useInfoAssessment'
import { infoAssessmentState } from 'src/recoil/candidate/infoAssessmentState'
import AlarmIcon from '../../../assets/image/alarm.svg';
import welcomeCandidate from '../../../assets/image/homepate-1.png'
interface IFormData {
    email: string
}
export default function HomeViews() {
    const { handleSubmit, register, formState: { errors } } = useForm<IFormData>({ mode: "onChange" });
    const router = useRouter()
    const infoAssessment = useRecoilValue(infoAssessmentState)
    const { getInfoAssessment } = useInfoAssessment()
    const { executeLogin } = useCandidateLogin()
    const { token } = router.query
    useEffect(() => {
        if (router.isReady) {
            getInfoAssessment({ sub_link: token })
        }
    }, [router.isReady])
    const { start_date, end_date } = infoAssessment
    const onSubmit = (data: IFormData) => {
        executeLogin({ token: token, candidateInfo: data, sub_link: token as string })

    }
    let content = <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='mb-2.5 poppinsSemibold text-ink-500 text-xl md:text-5xl text-center'>
            Welcome to <br /> Crispy assessment</h1>
        <p className='w-300px mx-auto mb-10 poppinsRegular text-ink-500 text-center '>Thanks for your interest in this position!
            Please enter your email adress to access the assessment.</p>
        <div className="mb-3">
            <input className='w-full p-4 outline-none border border-white-100 rounded-lg poppinsRegular hover:border-primary-500 focus:border-primary-500 transition-all duration-300' placeholder='example@gmail.com' {...register("email", { required: "Email is required!", pattern: regexEmail })} />
            <span className='poppinsRegular text-red-500'>{errors.email?.type === "required" ? errors.email.message : ""}</span>
            <span className='poppinsRegular text-red-500'>{errors.email?.type === "pattern" ? "Email is invalid!" : ""}</span>
        </div>
        <button disabled={errors.email ? true : false} className={`${errors.email ? "bg-primary-100" : "bg-primary-500"} poppinsMedium w-full py-2.5 mb-7  rounded-lg text-white-500 `}>Continue</button>
    </form>
    if (start_date) {
        if (new Date().getTime() < new Date(start_date).getTime()) {
            content = <div >
                <h1 className='mb-2.5 poppinsSemibold text-ink-500 text-xl md:text-5xl text-center'>
                    Shopee Assessment <br /> is coming soon</h1>
                <p className='w-300px mx-auto mb-4 poppinsRegular text-ink-500 text-center '>Thanks for your interest in this position!
                    Assessment would officially start at the time below</p>
                <div className='text-center'>
                    <div className='inline-flex items-center gap-2 mb-10 px-4 py-3 bg-primary-100 rounded-full text-ink-500 poppinsMedium'><Image src={AlarmIcon} /> {moment(start_date).format('LT')} {moment(start_date).format('DD/MM/YYYY')}</div>
                </div>
            </div>
        }
    }
    if(end_date){
        if (new Date().getTime() > new Date(end_date).getTime()) {
            content = <div >
                <h1 className='mb-2.5 poppinsSemibold text-ink-500 text-xl md:text-5xl text-center'>
                    Shopee Assessment <br /> has ended.</h1>
                <p className='w-300px mx-auto mb-4 poppinsRegular text-ink-500 text-center '>Thank you for participating.</p>
            </div>
        }
    }
    return (
        <div className='mt-0 px-3 md:mt-10 md:px-0 flex justify-center h-screen  items-center md:items-start'>
            <div className='md:w-500px' >
                <div className='hidden md:flex mb-60px items-center justify-center w-full h-300px py-6 px-50px shadow-3xl'>
                    <Image src={welcomeCandidate} objectFit='cover' alt='candidate-welcome' />
                </div>
                <div className='block md:hidden mb-2 w-100px h-100px mx-auto'>
                    <Image src={welcomeCandidate} width={100} height={100} alt='candidate-welcome' />
                </div>
                {content}
            </div>
        </div>
    )
}
