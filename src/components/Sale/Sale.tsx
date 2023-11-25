import React from 'react';
import s from '../Sale/styles.module.scss';
import { useGetSaleProductsQuery } from '@/redux/api/productApi';
import Loading from '../Loading';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sale = () => {
  const { data: products, isLoading } = useGetSaleProductsQuery(null);
  const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={s.sale}>
        <div className={s.container}>
          {products?.length ? (
            <>
              <h1>Акции.</h1>
              <div className={s.sale_parent}>
                {products?.slice(0, 8).map((el) => (
                  <Link
                    href={`/tovar/${el?.id}`}
                    className={s.sale_products_card}
                    key={el?.id}
                  >
                    {el?.is_sale ? (
                      <button className={s.sale_prod_btn}>Акция</button>
                    ) : null}
                    <Image fill alt={el?.name} src={el?.image} />
                    <h4>{el?.name}</h4>
                    <p>{el?.description}</p>
                    <span>
                      <b>{el?.price.toLocaleString()} сум</b>
                      {el?.old_price === null ? null : (
                        <h6>{el?.old_price.toLocaleString()} сум</h6>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
              <div className={s.all_sales}>
                <button onClick={() => router.push('/sale')}>
                  Смотреть все Акции
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sale;
