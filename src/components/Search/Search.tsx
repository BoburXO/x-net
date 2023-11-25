import { useEffect, useId, useState } from 'react';
import s from '../Search/styles.module.scss';
import 'react-modern-drawer/dist/index.css';

import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { useDebounce } from 'usehooks-ts';
import Drawer from 'react-modern-drawer';
import Link from 'next/link';

import { useLazyGetProductsSearchQuery } from '@/redux/api/productApi';
import { Product } from '@/types';

const Search = () => {
  const [trigger, { currentData: products }] = useLazyGetProductsSearchQuery();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchMob, setSearchMob] = useState('');
  const debouncedValue = useDebounce<string>(searchMob, 1000);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setSearchMob('');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }

    if (!isOpen) {
      document.body.style.overflowY = 'scroll';
    }
  }, []);

  useEffect(() => {
    if (!searchMob) return;

    trigger(
      {
        search: searchMob,
      },
      true,
    ).unwrap();
  }, [debouncedValue]);

  return (
    <>
      {/* <div className={s.container}> */}
      <AiOutlineSearch onClick={toggleDrawer} className={s.search_icon} />
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='bla bla bla'
        size={'100%'}
        customIdSuffix={useId()}
      >
        <div className={s.search_comp}>
          <div className={s.search_comp_labels}>
            <span>
              <BsArrowLeft onClick={toggleDrawer} className={s.back_label} />
            </span>
            <h1>Поиск</h1>
            <span></span>
          </div>
          <div className={s.search_comp_input}>
            <input
              value={searchMob}
              onChange={(event) => setSearchMob(event.target.value)}
              type='text'
              placeholder='Название товара...'
            />
          </div>
          <div
            style={{ display: searchMob.length ? 'block' : 'none' }}
            className={s.filters_result_box}
          >
            <ul>
              {products?.length ? (
                products?.map((el: Product) => {
                  return (
                    <Link href={`/tovar/${el?.id}`} key={el?.id}>
                      <img src={el?.image} alt='' />
                      {el?.name.length <= 58 ? (
                        <p>{el?.name}</p>
                      ) : (
                        <p>
                          {el?.name.slice(0, 58)}
                          {'...'}
                        </p>
                      )}
                      <p className={s.filters_result_box_price}>
                        {el?.price.toLocaleString()} сум
                      </p>
                    </Link>
                  );
                })
              ) : (
                <>
                  <br />
                  <b>Не найдено</b>
                </>
              )}
            </ul>
          </div>
        </div>
      </Drawer>
      {/* </div> */}
    </>
  );
};

export default Search;
