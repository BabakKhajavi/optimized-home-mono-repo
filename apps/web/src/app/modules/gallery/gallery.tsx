'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import styles from './gallery.module.scss';
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
    console.log('id', id);
    const newIsLoadingList = [...isLoadingList];
    newIsLoadingList[index] = true;
    setIsLoadingList(newIsLoadingList);
    router.push(`/subcategory/${id}`);
    newIsLoadingList[index] = false;
    setIsLoadingList(newIsLoadingList);
  };
  console.log('galleries', galleries);
  return (
    <Box className={styles.wrapper}>
      <Box>
        <Typography className={styles.section_title}>Galleries</Typography>
      </Box>
      <Box className={styles.galleries_container}>
        {galleries.map((item: GallerySubcategoryResponse, index) => (
          <div
            key={index}
            onClick={() => handleNavigateToGallery(item.subcategory_id, index)}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={
                item?.media_thumb
                  ? `${baseStaticURL}/gallery/${item.media_thumb}`
                  : '/placeholder.jpg'
              }
              alt={item?.subtitle || 'Gallery image'}
              // layout="responsive"
              // objectFit="contain"
              quality={100}
              width={400}
              height={400}
              onClick={() =>
                handleNavigateToGallery(item.subcategory_id, index)
              }
              style={{
                pointerEvents: 'auto',
                cursor: 'pointer',
                zIndex: 200,
              }}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};
