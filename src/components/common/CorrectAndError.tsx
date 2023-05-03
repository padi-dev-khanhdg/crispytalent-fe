import { NextComponentType } from 'next'
import Image from 'next/image'
import React from 'react'
import Check_1 from '../../assets/image/check_1.png'
import Wrong_1 from '../../assets/image/error.png'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { checkCorrectState, checkWrongState } from 'src/recoil/candidate/checkState'

const CorrectAndError: NextComponentType = () => {
    const correct = useRecoilValue(checkCorrectState)
    const wrong = useRecoilValue(checkWrongState)
    const container = {
        hidden: { opacity: 0,scale:0, transition: {
            duration: 1000
        } },
        show: {
            opacity: 1,
            scale:1,
            transition: {
                staggerChildren: 0.5
            }
        }
    }

    const item = {
        hidden: { opacity: 0,scale:0, },
        show: { opacity: 1, scale:1, }
    }
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit='hidden' 
            className='absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center'>
            {correct?<motion.div variants={item} ><Image src={Check_1} alt="check" /></motion.div>:''}
            {wrong?<motion.div variants={item} ><Image src={Wrong_1} alt="check" /></motion.div>:''}
        </motion.div>
    )
}
export default CorrectAndError
