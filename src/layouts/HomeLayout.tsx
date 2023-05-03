import Head from 'next/head';
import React, { ReactNode } from 'react';
import Header from 'src/components/hr/header/header';

type Props = {
  children: ReactNode;
  title?: string;
};

const HomeLayout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header/>
      {children}
    </div>
  );
};
export default HomeLayout;
