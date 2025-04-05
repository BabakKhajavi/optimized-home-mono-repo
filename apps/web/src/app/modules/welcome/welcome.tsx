'use client';
import React from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Box, Divider, Typography } from '@mui/material';
import { IWelcome } from '@packages/common';
import styles from './welcome.module.scss';
const baseStaticURL = process.env.NEXT_PUBLIC_BASE_STATIC_URL;

interface GalleryPropsType {
  welcome: IWelcome;
}
export const Welcome: React.FC<GalleryPropsType> = async ({ welcome }) => {
  const mediaType = welcome.media.split('.').pop();
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.section_title_wrapper}>
        <Typography
          component="h5"
          variant="body1"
          className={styles.section_title}
        >
          {welcome.title}
        </Typography>
        <Divider />
        <Box className={styles.section_description}>{welcome.description}</Box>
        <Typography className={styles.section_title}>
          {welcome.subtitle}
        </Typography>
        <Box className={styles.subsection_container}>
          <Typography component="p" className={styles.section_description}>
            {welcome.sub_description}
          </Typography>
          <Box className={styles.media_wrapper}>
            {/* {mediaType !== 'mp4' ? (
              <Image
                src={`${baseStaticURL}/welcome/${welcome.media}`}
                alt={`Welcome video`}
                className="image"
              />
            ) : (
              <ReactPlayer
                url={`${baseStaticURL}/welcome/${welcome.media}`}
                controls={true}
                loop
                playing
                muted
                width="100%"
                height="100%"
                style={{ backgroundColor: '#000' }}
              />
            )} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
