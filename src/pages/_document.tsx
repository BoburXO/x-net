import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>X-NET | Телекоммуникационное обородувание</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
        <meta
          name='description'
          content='Компания «X-NET» была создана в 2022 году. Мы занимаемся
                поиском, разработкой и внедрением готовых IT-решений;
                осуществляем комплексные поставки оборудования.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
