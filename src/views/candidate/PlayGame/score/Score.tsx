import { NextComponentType } from 'next'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScoreState } from 'src/recoil/candidate/scoreState'
import {  useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'

const Score: NextComponentType = () => {
    const router = useRouter()
    const showScore = useRecoilValue(ScoreState)
    return (
        <motion.div animate={{ scale: [0,1] }} className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white-500 z-10'>
            <motion.h1 animate={{ scale: [0, 1], opacity: [0, 1] }} transition={{ delay: 1, duration: 0.3 }} className='poppinsSemibold text-primary-500 text-32px md:text-6xl text-center'>Your score: {showScore.score}</motion.h1>
        </motion.div>
    )
}
export default Score