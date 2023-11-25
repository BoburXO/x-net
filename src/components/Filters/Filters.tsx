import { useEffect, useState } from 'react';
import s from '../Filters/styles.module.scss';

import { CgMenuGridO } from 'react-icons/cg';
import { GiComputerFan } from 'react-icons/gi';
import { VscServerProcess } from 'react-icons/vsc';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useDebounce } from 'usehooks-ts';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import { useLazyGetProductsSearchQuery } from '@/redux/api/productApi';
import Search from '../Search/Search';

const Filters = () => {
  const { data: categories } = useGetCategoriesQuery(null);
  const [trigger, { currentData: products }] = useLazyGetProductsSearchQuery();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const debouncedValue = useDebounce(search, 1000);

  if (search.length)
    document.body.addEventListener('click', () => {
      setSearch('');
    });

  const handleChange = () => setExpanded(!expanded);

  useEffect(() => {
    const handleRouteChange = () => {
      setExpanded(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!search) return;

    trigger(
      {
        search: search,
      },
      true,
    ).unwrap();
  }, [debouncedValue]);

  return (
    <>
      <div className={s.filters}>
        <div className={s.container}>
          <div className={s.filters_main}>
            <Accordion
              className={s.filters_accordion}
              expanded={expanded}
              onChange={handleChange}
            >
              <AccordionSummary
                expandIcon={<CgMenuGridO className={s.filter_icon} />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography className={s.filters_title}>
                  Каталог товаров
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={s.new_postuplenie}>
                <Link href={'/sale'} className={s.filters_twise}>
                  <FaHandHoldingUsd size={20} />
                  <h3>Акции</h3>
                </Link>
              </AccordionDetails>
              <AccordionDetails className={s.new_postuplenie}>
                <Link href={'/novinki'} className={s.filters_twise}>
                  <GiComputerFan size={20} />
                  <h3>Новинки</h3>
                </Link>
              </AccordionDetails>
              <AccordionDetails>
                {categories?.map(
                  (el) =>
                    !el?.parent_category && (
                      <Link
                        key={el?.id}
                        href={`/category/${el?.id}`}
                        className={s.filters_twise}
                      >
                        <VscServerProcess />
                        <h4>{el?.name}</h4>
                      </Link>
                    ),
                )}
              </AccordionDetails>
            </Accordion>
            <div className={s.search_desk}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={s.filters_input}
                type='text'
                placeholder='Название товара...'
              />
              <div
                style={{ display: search.length ? 'block' : 'none' }}
                className={s.filters_result_box}
              >
                <ul>
                  {products?.length ? (
                    products?.map((el) => {
                      return (
                        <li key={el?.id}>
                          <Link href={`/tovar/${el?.id}`}>
                            <img src={el?.image} alt='' />
                            {el?.name.length <= 58 ? (
                              <p>{el?.name}</p>
                            ) : (
                              <p>
                                {el?.name.slice(0, 58)}
                                {'...'}
                              </p>
                            )}
                            <p>{el?.price.toLocaleString()} сум</p>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <b>Не найдено</b>
                  )}
                </ul>
              </div>
            </div>
            <div className={s.search_mob}>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
