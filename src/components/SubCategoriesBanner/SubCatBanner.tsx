import s from '../SubCategoriesBanner/styles.module.scss';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import { Category, SubCategory } from '@/types';
import Loading from '../Loading';

const SubCatBanner = () => {
  const { data: category, isLoading } = useGetCategoriesQuery(null);
  const router = useRouter();
  const catId = router.query;

  if (isLoading) return <Loading />;

  const categoryFind = category?.find((el: Category) => {
    return el?.id == +catId?.id!;
  });

  return (
    <div className={s.sub_cat_banner_main}>
      <div className={s.container}>
        <div className={s.sub_cat_banner_parent}>
          {categoryFind?.sub_categories?.map((el: SubCategory) => {
            return (
              <Link
                href={`/sub-category/${el?.id}`}
                className={s.sub_cat_banner_card}
                key={el?.id}
              >
                {el?.image === null ? (
                  <Image fill src='/sub_cat.webp' alt='' />
                ) : (
                  <Image fill src={el?.image} alt='' />
                )}
                <p>{el?.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCatBanner;
