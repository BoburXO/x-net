import { useState } from 'react';
import s from '../styles/sale.module.scss';

import Head from 'next/head';
import Link from 'next/link';

import { useGetSaleProductsQuery } from '@/redux/api/productApi';
import Loading from '@/components/Loading';
import { Product } from '@/types';

const SalePage = () => {
  const { data: products, isLoading } = useGetSaleProductsQuery(null);
  const [more, setMore] = useState(20);

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>X-NET | Акции</title>
      </Head>
      <div className={s.products_page_main}>
        <div className={s.container}>
          <span className={s.products_page_title}>
            <h1>Акции.</h1>
            <p>{products?.length} товаров</p>
          </span>
          <div className={s.products_parent}>
            {products?.slice(0, more).map((el: Product) => (
              <Link
                href={`/tovar/${el?.id}`}
                className={s.products_card}
                key={el?.id}
              >
                <img src={el?.image} alt={el?.name} />
                {el?.name?.length <= 45 ? (
                  <h4>{el?.name}</h4>
                ) : (
                  <h4>
                    {el?.name.slice(0, 45)}
                    {'...'}
                  </h4>
                )}
                {el?.description.length <= 85 ? (
                  <p>{el?.description}</p>
                ) : (
                  <p>
                    {el?.description.slice(0, 85)}
                    {'...'}
                  </p>
                )}
                <span>
                  <b>{el?.price.toLocaleString()} сум</b>
                  {el?.old_price === null ? null : (
                    <h6>{el?.old_price.toLocaleString()} сум</h6>
                  )}
                </span>
              </Link>
            ))}
          </div>
          <div className={s.more_btn}>
            <button
              style={{
                display: more >= products?.length! ? 'none' : 'block',
              }}
              onClick={() => setMore((prev) => prev + 8)}
            >
              Загрузить ещё
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalePage;
