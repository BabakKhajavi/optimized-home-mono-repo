'use client';
import React, { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Divider, Typography, Box } from '@mui/material';
import styles from './subcategory.module.scss';
import { IGallery, ISubcategory } from '@packages/common';
import 'react-multi-carousel/lib/styles.css';
import { scrollWithOffset } from '../../../utils/scrollWithOffset';
import { SubcategoryGallery } from '../gallery/detailed-gallary';
import axios from 'axios';
const baseApiURL = process.env.NEXT_PUBLIC_BASE_URL;
const fetchSubcategory = async (id: number) => {
  const { data } = await axios.get(`${baseApiURL}gallery/subcategory/${id}`);
  return data;
};

interface SubcategoryPropsType {
  subcategory: ISubcategory;
  // galleries: IGallery[];
}
export const Subcategory: React.FC<SubcategoryPropsType> = ({
  subcategory,
  // galleries,
}) => {
  const {
    data: subcategoryGalleries,
    isLoading,
    isError,
  } = useQuery<IGallery[]>({
    queryKey: ['subcategoryGallery', subcategory.id],
    queryFn: () => fetchSubcategory(subcategory.id as number),
  });
  console.log('subcategory[*]=>', subcategory);
  console.log('subcategoryGalleries[*]=>', subcategoryGalleries);
  const viewRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (viewRef.current) {
      scrollWithOffset(viewRef.current);
    }
  }, []);
  return (
    <Box ref={viewRef} className={styles.wrapper}>
      <Box className={styles.section_title_wrapper}>
        <Typography className={styles.section_title}>
          {subcategory.title}
        </Typography>
      </Box>
      <Divider
        orientation="horizontal"
        variant="middle"
        sx={{ color: 'red', width: '600px', mt: 1 }}
      />
      <Box className={styles.description}>{subcategory.description}</Box>
      <Box className={styles.gallery_wrapper}>
        <SubcategoryGallery galleries={subcategoryGalleries || []} />
      </Box>
    </Box>
  );
};
