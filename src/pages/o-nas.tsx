import React from 'react';
import s from '../styles/o-nas.module.scss';
import Head from 'next/head';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>X-NET | О нас</title>
      </Head>
      <div className={s.o_nas}>
        <div className={s.container}>
          <br />
          <h1>О компании</h1>
          <br />
          <p>
            Компания «X-NET» была создана в 2022 году. Мы занимаемся поиском,
            разработкой и внедрением готовых IT-решений; осуществляем
            комплексные поставки оборудования.
            <br />
            Наша основная цель – учесть все IT-потребности предприятий и
            обеспечить их качественным сетевым оборудованием максимально быстро
            и недорого.
          </p>
          <br />
          <div className={s.map_yandex}>
            <iframe src='https://yandex.uz/map-widget/v1/?ll=69.281875%2C41.267497&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTIyNTAxODYwEkNPyrt6YmVraXN0b24sIFRvc2hrZW50LCBTZXJnZWxpIHR1bWFuaSwgVWNodXZjaGlsYXIgU2hhaGFyY2hhc2ksIDgwIgoNUpCKQhXqESVC&z=16.74'></iframe>
          </div>
          <br />
          <h2>Контакты</h2>
          <br />
          <a href='tel: +998331989889'>+998 (33) 198-98-89 Хусан</a>
          <br />
          <br />
          <a href='tel: +998331898998'>+998 (33) 189-89-98 Хасан</a>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
