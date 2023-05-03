import { NextComponentType } from 'next'
import Image from 'next/image'
import React, { useState, useEffect,useRef } from 'react'
import Left from '../../../../assets/image/Left- normal.png'
import LeftHover from '../../../../assets/image/Left - hover.png'
import Right from '../../../../assets/image/Right - normal.png'
import RightHover from '../../../../assets/image/Right - hover.png'
import Skip from '../../../../assets/image/skip.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TargetIcon from '../../../../assets/image/target.svg'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlayGame from '../../../../assets/image/play-game.png'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { generateQuestionState } from 'src/recoil/candidate/generateQuestionState'
import { useAnswerQuestion } from 'src/hooks/candidate/useAnswerQuestion'
import { OPPOSITE_ANSWER, SAME_ANSWER } from 'src/constants/questionConstant'
import { useFinishGame } from 'src/hooks/candidate/useFinishGame'
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from 'src/hooks/useModal'
import LeaveGame from 'src/components/common/leaveGame'
import { useRouter } from 'next/router'
const Verbal: NextComponentType = () => {
  const generateQuestion = useRecoilValue(generateQuestionState)
  const [buttonClick, setButtonClick] = useState({ left: false, right: false })
  const [counter, setCounter] = useState<number>(generateQuestion.time - generateQuestion.used_time)
  const { finishThisGame } = useFinishGame()
  const { setting } = useModal()
  const router=useRouter()
  const { answerQuestion } = useAnswerQuestion()
  const { question, total_question, answered_question_num, total_score, } = generateQuestion
  const totalQuestionRef = useRef(0)
  const {sub_link, game_id}=router.query
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter <= 0 && sub_link) {
      finishThisGame({ game_id: question.game_id,sub_link:sub_link as string },totalQuestionRef.current)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [counter])
  // useEffect(() => {
  //   const handleKeyPress = (event: any) => {
  //     const { keyCode } = event
  //     if (keyCode === 39) {
  //       event.preventDefault()
  //       handleClickRightButton()
  //     }
  //     if (keyCode === 37) {
  //       event.preventDefault()
  //       handleClickLeftButton()
  //     }
  //     if (keyCode === 38) {
  //       event.preventDefault()
  //       handleClickSkip()
  //     }
  
  //   }
  //   window.addEventListener('keydown', handleKeyPress)
  //   return () => { window.removeEventListener("keydown", handleKeyPress) }
  // }, [])
  useEffect(() => {
    totalQuestionRef.current=total_question
    setCounter(generateQuestion.time - generateQuestion.used_time)
  }, [generateQuestion])
  const handleClickLeftButton = () => {
    setButtonClick({ ...buttonClick, left: true })
    answerQuestion({ game_id: question.game_id, answer: OPPOSITE_ANSWER, question_id: question.id, is_skip: 0 },sub_link as string,game_id as string,totalQuestionRef.current)
    setTimeout(() => {
      setButtonClick({ ...buttonClick, left: false })
    }, 300)
  }
  const handleClickRightButton = () => {
    setButtonClick({ ...buttonClick, right: true })
    answerQuestion({ game_id: question.game_id, answer: SAME_ANSWER, question_id: question.id, is_skip: 0 },sub_link as string,game_id as string,totalQuestionRef.current)
    setTimeout(() => {
      setButtonClick({ ...buttonClick, right: false })
    }, 300)
  }
  const handleClickSkip = () => {
    answerQuestion({ game_id: question.game_id, answer: OPPOSITE_ANSWER, question_id: question.id, is_skip: 1 },sub_link as string,game_id as string,totalQuestionRef.current)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1
      }
    }
  }
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 md:gap-3'>
          <div className='hidden md:block w-3 h-10 rounded bg-primary-500'></div>
          <button className='block relative z-10 md:hidden w-8 h-8 rounded-full border border-white-100'onClick={()=>{setting(<LeaveGame/>)}}><CloseIcon/></button>
          <h1 className='poppinsSemibold text-base md:text-32px text-ink-500 mb-0'>Verbal Challenge</h1>
        </div>
        <div className='flex items-center gap-3 md:gap-6'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 md:w-12 md:h-12 border rounded-full border-white-200'><AccessTimeIcon /></div>
            <p className='mb-0 poppinsSemibold text-base md:text-xl text-ink-500'>{counter}s</p>
          </div>
          <div className='hidden md:flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 md:w-12 md:h-12 border rounded-full border-white-200'><Image src={TargetIcon} alt='target' /></div>
            <p className='mb-0 poppinsSemibold text-base md:text-xl text-ink-500'>{answered_question_num}/{total_question}</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 md:w-12 md:h-12 border rounded-full border-white-200'><EmojiEventsIcon /></div>
            <p className='mb-0 poppinsSemibold text-base md:text-xl text-ink-500'>{Math.round((100/total_question)*total_score)}</p>
          </div>
        </div>
      </div>
      <div className='mt-5 h-px bg-gradient-to-r from-emerald-100/0 via-emerald-100/50 to-emerald-100/0 '></div>
      <div className='text-center mt-2.5 mb-5'>
        <Image src={PlayGame} alt='play game' />
      </div>
      <p className='mb-10 poppinsMedium text-base md:text-lg text-center'>Do two words have same or opposite meaning?</p>
      <motion.div variants={container} initial="hidden" animate="show" className='w-full md:w-600px mx-auto mb-60px md:mb-72px'>
        <motion.div variants={item} className='py-3 mb-30px w-full border border-white-100 rounded-xl poppinsSemibold text-center text-ink-500 text-32px'>{question?.content}</motion.div>
      </motion.div>
      <div className='relative mx-auto w-full md:w-680px h-230px '>
        <button className='outline-none absolute left-0 bottom-0 w-60 py-30px flex flex-col-reverse md:flex-row items-center poppinsMedium md:text-lg uppercase' onClick={handleClickLeftButton}>
          <p className='mb-0 flex-1 text-right pr-3'>OPPOSITE</p>
          <div className='relative w-50px md:w-100px h-50px md:h-100px'>
            <div className={`absolute w-full h-full -translate-y-[10px] focus:-translate-y-[10px] z-[2]  ${buttonClick.left ? 'hidden' : 'block'}`}><Image className='' src={Left} alt='left' /></div>
            <div className={`absolute w-full h-full ${buttonClick.left ? 'block' : 'hidden'}`}><Image src={LeftHover} alt='left' /></div>
          </div>
        </button>
        <button className='outline-none absolute right-0 bottom-0 w-60 py-30px flex flex-col md:flex-row items-center poppinsMedium md:text-lg uppercase' onClick={handleClickRightButton} >
          <div className=' relative w-50px md:w-100px h-50px md:h-100px'>
            <div className={`absolute w-full h-full -translate-y-[10px] focus:-translate-y-[10px] z-[2]  ${buttonClick.right ? 'hidden' : 'block'}`}><Image className='' src={Right} alt='left' /></div>
            <div className={`absolute w-full h-full ${buttonClick.right ? 'block' : 'hidden'}`}><Image src={RightHover} alt='left' /></div>
          </div>
          <p className='mb-0 flex-1 text-left pl-3'>SAME</p>
        </button>
      </div>

    </div>
  )
}
export default Verbal