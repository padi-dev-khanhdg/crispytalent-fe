import Head from 'next/head';
import React, { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from 'src/hooks/useModal';

import { motion } from "framer-motion"
import LeaveGame from 'src/components/common/leaveGame';

type Props = {
    children: ReactNode;
    title?: string;
};

const LayoutPlayGame = ({ children, title = 'This is the default title' }: Props) => {
    const {setting}=useModal()
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <motion.div
            animate={{translateY:['100%','0%'],opacity:[0,1]}}
            className=' w-full bg-game p-0 md:p-10'>
                <div><button className='w-10 h-10 rounded-full bg-white-200' onClick={()=>{setting(<LeaveGame/>)}}><CloseIcon/></button></div>
                <div className='mt-9 flex justify-center'>
                        {children}
                </div>
            </motion.div>

        </>
    );
};
export default LayoutPlayGame;
