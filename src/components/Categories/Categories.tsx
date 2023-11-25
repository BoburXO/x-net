import s from '../Categories/styles.module.scss';

import Link from 'next/link';

import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import { Category } from '@/types';
import Loading from '../Loading';

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={s.categories_main_comp}>
        <div className={s.container}>
          <h2>Kаталог категорий</h2>
          <div className={s.categories_main_parent}>
            {categories?.map(
              (el) =>
                !el?.parent_category && (
                  <div
                    style={{
                      backgroundImage: `url(${el.image})`,
                    }}
                    className={s.categories_card}
                    key={el?.id}
                  >
                    <Link
                      className={s.category_name}
                      href={`/category/${el?.id}`}
                    >
                      {el?.name}
                    </Link>
                    <div className={s.sub_cat}>
                      {el?.sub_categories?.map((sub: Category) => (
                        <Link key={sub?.id} href={`/sub-category/${sub?.id}`}>
                          {sub?.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
