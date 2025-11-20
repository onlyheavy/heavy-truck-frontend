import { CategoryProvider } from '@/hooks/useContext';
import '@/styles/globals.css';
import 'rc-slider/assets/index.css';
import '@/styles/sliderStyles.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
   <>
     <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_S3_URL}favicons.png`} type="image/x-icon" />
        {/* Or if using PNG: */}
        {/* <link rel="icon" href="/favicons.png" type="image/png" /> */}
      </Head>
    <CategoryProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" reverseOrder={false} />
    </CategoryProvider>
   </>
  );
}
