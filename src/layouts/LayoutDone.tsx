import Head from 'next/head';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import Header from 'src/components/hr/header/header';

import ThankYou from '../assets/image/thankyou.png'
type Props = {
    children: ReactNode;
    title?: string;
};

const LayoutDone = ({ children, title = 'This is the default title' }: Props) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className='md:mt-10 flex flex-col-reverse md:flex-row items-center  md:items-start md:justify-between px-4 md:px-100px'>
                {children}
                <div className='w-300px h-300px md:w-800px md:h-800px'>
                    <Image src={ThankYou} objectFit="cover" alt='thank you'/>
                </div>
            </div>
        </div>
    );
};
export default LayoutDone;
