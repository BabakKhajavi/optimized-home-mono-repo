'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import styles from './gallery.module.scss';
import { motion } from 'framer-motion';
import { GallerySubcategoryResponse } from '../../../types';
const baseStaticURL = process.env.NEXT_PUBLIC_BASE_STATIC_URL;

interface GalleryPropsType {
  galleries: GallerySubcategoryResponse[];
}

export const Gallery: React.FC<GalleryPropsType> = ({ galleries }) => {
  const router = useRouter();
  const initialIsLoadingList = galleries?.map(() => false);
  const [isLoadingList, setIsLoadingList] = useState(initialIsLoadingList);
  const handleNavigateToGallery = (id: number, index: number) => {
    const newIsLoadingList = [...isLoadingList];
    newIsLoadingList[index] = true;
    setIsLoadingList(newIsLoadingList);
    setTimeout(() => {
      router.push(`/subcategory/${id}`);
      newIsLoadingList[index] = false;
      setIsLoadingList(newIsLoadingList);
    }, 1500);
  };
  console.log('galleries', galleries);
  return (
    <Box className={styles.wrapper}>
      <Box>
        <Typography className={styles.section_title}>Galleries</Typography>
      </Box>
      <Box className={styles.galleries_container}>
        {galleries.map((item: GallerySubcategoryResponse, index) => (
          <Box
            className={styles.galleries_item_wrapper}
            key={index}
            onClick={() => handleNavigateToGallery(item.subcategory_id, index)}
          >
            <Typography className={styles.galleries_title}>
              {item?.subcategory.title}
            </Typography>
            {isLoadingList[index] && (
              <Box className={styles.circle_loading_wrapper}>
                <CircularProgress color="inherit" />
              </Box>
            )}
            <Box className={styles.image_wrapper}>
              <motion.div
                style={{
                  overflow: 'hidden',
                  borderRadius: '8px',
                }}
                whileHover={{ scale: 1.1 }} /* Zoom effect on hover */
              >
                <Image
                  src={
                    item?.media_thumb
                      ? `${baseStaticURL}/gallery/${item.media_thumb}`
                      : '/placeholder.jpg'
                  }
                  alt={item?.subtitle || 'Gallery image'}
                  layout="responsive"
                  objectFit="cover"
                  quality={100}
                  width={1800}
                  height={752}
                  className="image"
                />
              </motion.div>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={styles.carousel_container}>
        {galleries.length > 0 && (
          <Carousel
            showArrows
            dynamicHeight={false}
            showThumbs={false}
            interval={12000}
            transitionTime={1000}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
          >
            {galleries?.map((item: GallerySubcategoryResponse, index) => (
              <Box
                className={styles.galleries_item_wrapper}
                key={index}
                onClick={() =>
                  handleNavigateToGallery(item.subcategory_id, index)
                }
              >
                <Typography className={styles.galleries_title}>
                  {/* {subcategories[index]?.subcategory_name} */}
                </Typography>
                {isLoadingList[index] && (
                  <Box className={styles.circle_loading_wrapper}>
                    <CircularProgress color="inherit" />
                  </Box>
                )}
                <Box className={styles.image_wrapper}>
                  <Image
                    src={`${baseStaticURL}/gallery/${item?.media_thumb}`}
                    alt={item?.subtitle}
                    fill
                    className="image"
                  />
                </Box>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
};
