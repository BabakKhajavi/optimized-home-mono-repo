'use client';

import { FC } from 'react';
import { IJumbotron } from '@packages/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const JumbotronSwiper: FC<{ jumbotronList: IJumbotron[] }> = ({
  jumbotronList,
}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 10000 }}
      //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {jumbotronList.map((jumbotron, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_STATIC_URL}/jumbotron/${jumbotron.media}`}
              alt={jumbotron.title}
              layout="responsive"
              objectFit="cover"
              quality={100}
              width={1800}
              height={752}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <h2>{jumbotron.title}</h2>
              <p>{jumbotron.subtitle}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
