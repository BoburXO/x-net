import { FC } from 'react';
import s from '../tovar/styles.module.scss';

import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart';
import { BsDot } from 'react-icons/bs';
import { Image } from 'antd';
import Head from 'next/head';

import { getProducts, getRunningQueriesThunk } from '@/redux/api/productApi';
import { wrapper } from '@/redux/store';
import { Characteristics, Product } from '@/types';
import Loading from '@/components/Loading';
import Link from '../../../node_modules/next/link';

type SingleProductProps = {
  products: Product[];
  isLoading: boolean;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { data, isLoading } = await store.dispatch(
      getProducts.initiate(null),
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        products: data,
        isLoading,
      },
    };
  },
);

const SingleProduct: FC<SingleProductProps> = ({ products, isLoading }) => {
  const { addItem, getItem, removeItem } = useCart();
  const router = useRouter();
  const prodId = router.query;

  if (isLoading) return <Loading />;

  const queryFind = products?.find((el: Product) => {
    return el?.id == +prodId?.id!;
  });

  return (
    <>
      <Head>
        <title>X-NET | {queryFind?.name}</title>
        <meta name='description' content={queryFind?.description} />
        <meta property='og:image' content={queryFind?.image} />
        <meta property='og:title' content={queryFind?.name} />
        <meta property='og:description' content={queryFind?.description} />
      </Head>
      <div className={s.single_product_page}>
        <div className={s.container}>
          <h1 className={s.single_product_name}>{queryFind?.name}</h1>
          <span className={s.page_routes}>
            <Link href='/'>Главная</Link>
            <sub>/</sub>
            <Link href={`/category/${queryFind?.category?.id}`}>
              {queryFind?.category?.name}
            </Link>
            <sub>/</sub>
            {/* @ts-ignore */}
            <Link href={`/sub-category/${queryFind?.sub_category?.id}`}>
              {/* @ts-ignore */}
              {queryFind?.sub_category?.name}
            </Link>
            <sub>/</sub>
            <p>{queryFind?.name}</p>
          </span>
          <div className={s.single_product_main}>
            <div className={s.single_product_main_left}>
              <Image.PreviewGroup>
                <Image src={queryFind?.image} />
              </Image.PreviewGroup>
            </div>
            <div className={s.single_product_main_right}>
              {queryFind?.is_used ? (
                <button className={s.used_btn}>USED</button>
              ) : null}
              <span>
                <BsDot className={s.dot} /> В наличии
              </span>
              <div className={s.add_to_card}>
                <h2>{queryFind?.price.toLocaleString()} сум</h2>
                {/* @ts-ignore */}
                {!getItem(queryFind?.id!) ? (
                  // @ts-ignore
                  <button onClick={() => addItem(queryFind)}>Купить</button>
                ) : (
                  <>
                    {/* @ts-ignore */}
                    <button onClick={() => removeItem(queryFind?.id!)}>
                      Отменить
                    </button>
                  </>
                )}
              </div>
              <div className={s.empty}></div>
              <h3>Описание</h3>
              <p>{queryFind?.description}</p>
            </div>
          </div>
          <div className={s.product_characteristics}>
            <h3>Характеристики</h3>
            <br />
            {queryFind?.characteristics?.length ? (
              queryFind?.characteristics?.map((el: Characteristics) => {
                return (
                  <div className={s.characteristics_twise} key={el?.id}>
                    <span className={s.characteristics_key}>{el?.key} :</span>
                    <span className={s.characteristics_key_value}>
                      {el?.value}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className={s.empty_xarakter}>Пусто</p>
            )}
          </div>
          <div className={s.come_back}>
            <button onClick={() => router.back()}>Назад</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
