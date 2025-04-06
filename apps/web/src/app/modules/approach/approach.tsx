'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import styles from './approach.module.scss';
import { IApproach } from '@packages/common';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { PrimaryButton } from '@packages/atoms';
const baseStaticURL = process.env.NEXT_PUBLIC_BASE_STATIC_URL;

interface ApproachPropsType {
  approaches: IApproach[];
}
const responsive = {
  desktopXL: {
    breakpoint: { max: 5000, min: 1400 },
    items: 5,
    // paritialVisibilityGutter: 60,
  },
  desktopLG: {
    breakpoint: { max: 1450, min: 1260 },
    items: 4,
    paritialVisibilityGutter: 10,
  },
  tabletLG: {
    breakpoint: { max: 1260, min: 1030 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  tabletMD: {
    breakpoint: { max: 1030, min: 800 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobileMD: {
    breakpoint: { max: 800, min: 640 },
    items: 2,
  },
  mobileSM: {
    breakpoint: { max: 640, min: 450 },
    items: 1,
    paritialVisibilityGutter: 100,
  },
  mobileS: {
    breakpoint: { max: 450, min: 0 },
    items: 1,
  },
};
export const Approach: FC<ApproachPropsType> = ({ approaches }) => {
  const router = useRouter();
  const handleOpenRequestModal = () => {
    router.push('/request');
  };
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.section_title_wrapper}>
        <Typography component="h4" className={styles.section_title}>
          Our Approach
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          sx={{ color: 'red', width: '600px', mt: 1 }}
        />
      </Box>
      <Box mt={2}>
        <Carousel
          responsive={responsive}
          containerClass="caurosel-container"
          partialVisbile
        >
          {approaches?.map((item, index) => (
            <Box key={index} className={styles.cards}>
              <Box className={styles.step}> {index + 1}</Box>
              <div>
                <Box className={styles.jumbo_wrapper}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_STATIC_URL}/approach/${item.media}`}
                    alt={item.title}
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                    width={1800}
                    height={752}
                  />
                </Box>
              </div>
              <Box className={styles.card_title}>{item.title}</Box>
              <Box className={styles.card_summary}>{item.summary}</Box>
              {index === approaches.length - 1 && (
                <Box className={styles.button_wrapper}>
                  <PrimaryButton
                    isGolden
                    onClick={() => {
                      handleOpenRequestModal();
                    }}
                  >
                    {'Free Consultation / Quote'}
                  </PrimaryButton>
                </Box>
              )}
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};
