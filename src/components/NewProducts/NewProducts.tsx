import { useGetNewProductsQuery } from '@/redux/api/productApi';
import Loading from '../Loading';
import s from '../NewProducts/styles.module.scss';
import { Product } from '@/types';
import Image from '../../../node_modules/next/image';
import Link from '../../../node_modules/next/link';
import { useRouter } from 'next/router';

const NewProducts = () => {
  const router = useRouter();
  const { data: products, isLoading } = useGetNewProductsQuery(null);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={s.new_products}>
        <div className={s.container}>
          {products?.length ? (
            <>
              <h1>Новое поступление.</h1>
              <div className={s.new_products_parent}>
                {products?.slice(0, 8).map((el: Product) => {
                  return (
                    <Link
                      href={`/tovar/${el?.id}`}
                      className={s.new_products_card}
                      key={el?.id}
                    >
                      {el?.is_new ? (
                        <button className={s.new_prod_btn}>Новинка</button>
                      ) : null}
                      <Image fill alt={el?.name} src={el?.image} />
                      <h4>{el?.name}</h4>
                      <p>{el?.description}</p>
                      <span>
                        <b>{el?.price.toLocaleString()} сум</b>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className={s.all_sales}>
                <button onClick={() => router.push('/novinki')}>
                  Смотреть все Новинки
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NewProducts;
