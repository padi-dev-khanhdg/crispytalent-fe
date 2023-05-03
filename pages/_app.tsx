import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Loading from '../src/components/common/loading';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';
import { handleResultApi } from '../src/utils/handleResultApi';
import { useState } from 'react';
import 'antd/dist/antd.css';
import ModalHOC from 'src/components/common/modalHOC';
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          onError: (result: AxiosError) => {
            handleResultApi(result.response?.data);
          },
        },
        mutations: {
          onError: (result: AxiosError) => {
            
            handleResultApi(result.response?.data);
          },
        },

      },
      mutationCache: new MutationCache({
        onSuccess: response => {

        },

      })
    }),
  );

  return (

    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Loading />
        <ModalHOC />
        <ToastContainer />
        <Component {...pageProps} key={router.pathname} />
      </QueryClientProvider>
    </RecoilRoot>

  );
}

export default MyApp;
