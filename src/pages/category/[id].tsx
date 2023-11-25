import { useState } from 'react';
import s from '../../styles/products.module.scss';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import { Category, Product } from '@/types';
import Loading from '@/components/Loading';
import SubCatBanner from '@/components/SubCategoriesBanner/SubCatBanner';

const SingleCategory = () => {
  const { data: category, isLoading } = useGetCategoriesQuery(null);
  const router = useRouter();
  const catId = router.query;
  const [more1, setMore1] = useState(20);

  if (isLoading) return <Loading />;

  const categoryFind = category?.find((el: Category) => {
    return el?.id == +catId?.id!;
  });

  return (
    <>
      <Head>
        <title>X-NET | {categoryFind?.name} </title>
      </Head>
      <div className={s.products_page_main}>
        <SubCatBanner />
        <div className={s.container}>
          <span className={s.products_page_title}>
            <h1>{categoryFind?.name}.</h1>
            <p>{categoryFind?.products.length} товаров</p>
          </span>
          <span className={s.page_routes}>
            <Link href='/'>Главная</Link>
            <sub>/</sub>
            <p>{categoryFind?.name}</p>
          </span>
          {categoryFind?.products.length ? (
            <>
              <div className={s.products_parent}>
                {categoryFind?.products?.slice(0, more1).map((el: Product) => (
                  <Link
                    href={`/tovar/${el?.id}`}
                    className={s.products_card}
                    key={el?.id}
                  >
                    {el?.is_new ? (
                      <button className={s.new_prod_btn}>NEW</button>
                    ) : null}
                    {el?.is_used ? (
                      <button className={s.used_btn}>USED</button>
                    ) : null}
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
                    display:
                      more1 >= categoryFind?.products?.length
                        ? 'none'
                        : 'block',
                  }}
                  onClick={() => setMore1((prev) => prev + 8)}
                >
                  Загрузить ещё
                </button>
              </div>
            </>
          ) : (
            <h2 className='loading'>Товары не найдены</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleCategory;
