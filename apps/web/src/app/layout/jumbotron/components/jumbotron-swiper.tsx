'use client';

import { FC } from 'react';
import { IJumbotron } from '@packages/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export const JumbotronSwiper: FC<{ jumbotronList: IJumbotron[] }> = ({
  jumbotronList,
}) => {
  console.log(jumbotronList);
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      navigation
    >
      {jumbotronList.map((jumbotron, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_STATIC_URL}/jumbotron/${jumbotron.media}`}
              alt={jumbotron.title}
              layout="fill"
              objectFit="cover"
              quality={100}
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
