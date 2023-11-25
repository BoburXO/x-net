import s from '../styles/home.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Slider from 'react-slick';

import { useGetBannersQuery } from '@/redux/api/bannerApi';
import AboutUs from '@/components/AboutUs/AboutUs';
import Categories from '@/components/Categories/Categories';
import Loading from '@/components/Loading';
import NewProducts from '@/components/NewProducts/NewProducts';
import Sale from '@/components/Sale/Sale';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: 'linear',
};

export default function Home() {
  const { data: banners, isLoading } = useGetBannersQuery(null);

  const isCatalogBanner = banners?.filter(
    (el) => el?.is_catalog_banner === false,
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>X-NET | Телекоммуникационное обородувание</title>
      </Head>
      <div className={s.home_header}>
        <div className={s.container}>
          <h1>Телекоммуникационное обородувание</h1>
          <Slider {...settings}>
            {isCatalogBanner?.map((el) => {
              const isCategory = Boolean(el?.category);

              return (
                <div key={el?.id} className={s.home_banner}>
                  <Link
                    href={`/${isCategory ? 'category' : 'sub-category'}/${
                      isCategory ? el?.category : el?.sub_category
                    }`}
                  >
                    <Image fill src={el?.image} alt='banner' />
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <Categories />
      <NewProducts />
      <Sale />
      <AboutUs />
    </>
  );
}
