import { useEffect, useId, useState } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { HiShoppingCart } from 'react-icons/hi';
import { HiMenu } from 'react-icons/hi';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/router';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BiLogoTelegram } from 'react-icons/bi';
import { HiMail } from 'react-icons/hi';

const Nav = () => {
  const router = useRouter();
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return (
    <>
      <nav className={s.nav}>
        <div className={s.top__nav}>
          <div className={s.container}>
            <div className={s.top__nav__parent}>
              <div className={s.mobile__drawer}>
                <HiMenu
                  style={{ cursor: 'pointer' }}
                  className={s.mobile__toggle}
                  onClick={toggleDrawer}
                />

                <Drawer
                  open={isOpen}
                  onClose={toggleDrawer}
                  direction='left'
                  size={'80%'}
                  className='bla bla bla'
                  customIdSuffix={useId()}
                >
                  <div className={s.mobil_nav_parent}>
                    <Link href='/'>
                      <Image
                        className={s.logo_mobile}
                        fill
                        src='/x-logo.webp'
                        alt='Logo'
                      />
                    </Link>
                    <div className={s.mobile_routes}>
                      <Link href={'/'}>Главная Страница</Link>
                      <Link href={'/o-nas'}>О нас</Link>
                      <hr />
                      <span>
                        <a className={s.tg_link} href='https://t.me/xnecom'>
                          <BiLogoTelegram />
                          <p>X NET</p>
                        </a>
                      </span>
                      <span>
                        <a className={s.tg_link} href='mailto:info@x-net.uz'>
                          <HiMail />
                          <p>info@x-net.uz</p>
                        </a>
                      </span>
                      <span>
                        <a href='tel: +998971989889' className={s.twink}>
                          <BsFillTelephoneFill className={s.twink_phone} />
                          <p>+998 (33) 198-98-89 Хусан</p>
                        </a>
                        <br />
                        <a href='tel: +998971988998' className={s.twink}>
                          <BsFillTelephoneFill className={s.twink_phone} />
                          <p>+998 (33) 189-89-98 Хасан</p>
                        </a>
                      </span>
                    </div>
                  </div>
                </Drawer>
              </div>
              <Link href='/'>
                <Image className={s.logo} fill src='/x-logo.webp' alt='Logo' />
              </Link>
              <div className={s.nav__center}>
                <Link className={s.nav_center_link} href={'/'}>
                  Главная Страница
                </Link>
                <Link className={s.nav_center_link} href={'/o-nas'}>
                  О нас
                </Link>
                <span>
                  <a className={s.tg_link} href='https://t.me/xnecom'>
                    <BiLogoTelegram />
                    <p>X NET</p>
                  </a>
                </span>
                <span>
                  <a className={s.tg_link} href='mailto: info@x-net.uz'>
                    <HiMail />
                    <p>info@x-net.uz</p>
                  </a>
                </span>
                <span>
                  <a href='tel: +998331989889' className={s.twink}>
                    <BsFillTelephoneFill className={s.twink_phone} />
                    <p>+998 (33) 198-98-89 Хусан</p>
                  </a>
                  <a href='tel: +998331898998' className={s.twink}>
                    <BsFillTelephoneFill className={s.twink_phone} />
                    <p>+998 (33) 189-89-98 Хасан</p>
                  </a>
                </span>
              </div>
              <Link href={'/korzina'} className={s.nav__right}>
                <HiShoppingCart className={s.shop__cart} />
                <span suppressHydrationWarning>{items.length}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.bottom__nav__parent}></div>
      </nav>
    </>
  );
};

export default Nav;
