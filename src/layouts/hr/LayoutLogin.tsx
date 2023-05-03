import Head from 'next/head';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import Header from 'src/components/hr/header/header';
import login from "../../assets/image/login_1.png"
interface Props {
    children: ReactNode;
    title?: string;
};

const LayoutLogin = ({ children, title = 'This is the default title' }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className='mt-8 px-10 flex items-center'>
                <div className='flex-1'>
                    <Image src={login} width={680} height={680} alt="login" />
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>

        </>
    );
};
export default LayoutLogin;
