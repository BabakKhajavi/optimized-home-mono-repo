'use client';
import * as React from 'react';
import { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import styles from './detailed-gallery.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { IGallery } from '@packages/common';
import Image from 'next/image';

const baseStaticURL = process.env.NEXT_PUBLIC_BASE_STATIC_URL;

interface GalleryPropsType {
  galleries: IGallery[];
}
export const SubcategoryGallery: React.FC<GalleryPropsType> = ({
  galleries,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleSwiperChange = (swiper: any) => {
    setThumbsSwiper(swiper);
  };
  return (
    <Box>
      <Box className={styles.section_title_wrapper}>
        <Typography className={styles.section_title}>Galleries</Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          sx={{ width: '600px', mt: 1, mb: 2 }}
        />
      </Box>

      <Box className={styles.galleries_container}>
        <Swiper
          style={{
            // '--swiper-navigation-color': '#fff',
            // '--swiper-pagination-color': '#fff',
            width: '100%',
          }}
          slidesPerView={1}
          loop={true}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper_container}
        >
          {galleries.map((item: IGallery, index) => (
            <SwiperSlide key={index}>
              <Image
                src={`${baseStaticURL}/gallery/${item?.media}`}
                alt={item?.subtitle || 'Gallery image'}
                layout="responsive"
                objectFit="cover"
                quality={100}
                width={1000}
                height={750}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          style={{ width: '100%' }}
          onSwiper={handleSwiperChange}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper_thumb}
        >
          {galleries.map((item: IGallery, index) => (
            <SwiperSlide key={index}>
              <Image
                src={`${baseStaticURL}/gallery/${item?.media_thumb}`}
                alt={item?.subtitle || 'Gallery image'}
                layout="responsive"
                objectFit="cover"
                quality={100}
                width={400}
                height={400}
                className="image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
