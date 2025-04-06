'use client';
import React, { FC, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import styles from './review.module.scss';
import { IReview } from '@packages/common';
import 'react-multi-carousel/lib/styles.css';
import { Rating } from 'react-simple-star-rating';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const baseStaticURL = process.env.NEXT_PUBLIC_BASE_STATIC_URL;

interface ReviewPropsType {
  reviews: IReview[];
}
export const Review: FC<ReviewPropsType> = ({ reviews }) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.section_title_wrapper}>
        <Typography className={styles.section_title}>
          Our Clients Voice
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          sx={{ color: 'red', width: '300px', mt: 1 }}
        />
      </Box>
      <Box className={styles.reviews_wrapper}>
        {reviews.length > 0 && (
          <Carousel
            showArrows
            showIndicators={false}
            dynamicHeight={false}
            showThumbs={false}
            interval={5000}
            transitionTime={1500}
            autoPlay={true}
            infiniteLoop={true}
          >
            {reviews?.map((item: IReview, i) => (
              <Box key={i} className={styles.review_wrapper}>
                <Box className={styles.review_title_wrapper}>
                  <Typography className={styles.review_title}>
                    {item.owner}{' '}
                    <span className={styles.source}>from {item.source}</span>
                  </Typography>
                  <div>
                    <Rating initialValue={item.stars} readonly size={20} />
                  </div>
                </Box>
                <Typography component="p" className={styles.description}>
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
};
