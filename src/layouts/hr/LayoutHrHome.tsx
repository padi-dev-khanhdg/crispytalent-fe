import Head from 'next/head';
import React, { ReactNode } from 'react';
import Header from 'src/components/hr/header/header';

interface Props{
  children: ReactNode;
  title?: string;
};

const LayoutHrHome= ({ children, title = 'This is the default title' }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header/>
      {children}
    </>
  );
};
export default LayoutHrHome;
