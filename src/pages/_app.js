import { CategoryProvider } from '@/hooks/useContext';
import '@/styles/globals.css';
import 'rc-slider/assets/index.css';
import '@/styles/sliderStyles.css';
import { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <CategoryProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" reverseOrder={false} />
    </CategoryProvider>
  );
}
