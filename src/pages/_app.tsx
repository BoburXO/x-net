import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { CartProvider } from 'react-use-cart';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';

import store, { wrapper } from '@/redux/store';
import MainLayout from '@/components/layout/MainLayout';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CartProvider>
        <MainLayout>
          <NextNProgress
            height={2}
            options={{ showSpinner: false }}
            color='white'
          />
          <Component {...pageProps} />
        </MainLayout>
      </CartProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
