import { useState } from 'react';
import s from '../../styles/products.module.scss';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import { Category, Product, SubCategory } from '@/types';
import Loading from '@/components/Loading';

const SingleSubCategory = () => {
  const { data: category, isLoading } = useGetCategoriesQuery(null);
  const router = useRouter();
  const catId = router.query;
  const [more2, setMore2] = useState(20);

  if (isLoading) return <Loading />;

  const subCatFind = category?.map((cat: Category) => {
    return cat.sub_categories?.find((sub: SubCategory) => {
      return sub?.id == +catId?.id!;
    });
  });

  const resultFind: any = subCatFind?.find((el: any) => el?.id == catId.id);

  const parentCategory = resultFind?.products?.find(
    (el: Product) => el?.category?.id === resultFind?.parent,
  );
  return (
    <>
      <Head>
        <title>X-NET | {resultFind?.name}</title>
      </Head>
      <div className={s.products_page_main}>
        <div className={s.container}>
          <span className={s.products_page_title}>
            <h1>{resultFind?.name}.</h1>
            <p>{resultFind?.products.length} товаров</p>
          </span>
          <span className={s.page_routes}>
            <Link href='/'>Главная</Link>
            <sub>/</sub>
            <Link href={`/category/${parentCategory?.category?.id}`}>
              {parentCategory?.category?.name}
            </Link>
            <sub>/</sub>
            <p>{resultFind?.name}</p>
          </span>
          {resultFind?.products.length ? (
            <>
              <div className={s.products_parent}>
                {resultFind?.products?.slice(0, more2).map((el: Product) => (
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
                      more2 >= resultFind?.products?.length ? 'none' : 'block',
                  }}
                  onClick={() => setMore2((prev) => prev + 8)}
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

export default SingleSubCategory;
