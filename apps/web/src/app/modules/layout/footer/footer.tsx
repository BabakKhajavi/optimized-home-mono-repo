'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './footer.module.scss';
import {
  faCopyright,
  faPhone,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '@packages/atoms';
import { FC } from 'react';
import { IContact } from '@packages/common';

interface FooterProps {
  contact?: IContact;
}

export const Footer: FC<FooterProps> = ({ contact }) => {
  console.log('con', contact);
  return (
    <Box className={styles.wrapper}>
      <Link href={'/'} className={styles.top_image_link}>
        <Box className={styles.image_wrapper}>
          <Image
            src={'/images/main-logo.png'}
            alt="facebook"
            width={360}
            height={97}
          />
        </Box>
      </Link>
      <Box className={styles.footer_wrapper}>
        <Link href={'/'} className={styles.left_image_link}>
          <Box className={styles.image_wrapper}>
            <Image
              src={'/images/main-logo.png'}
              alt="facebook"
              width={250}
              height={51}
            />
          </Box>
        </Link>
        <Box className={styles.links_wrapper}>
          <Box className={styles.contact_us_title}>Links</Box>
          <Box className={styles.link_wrapper}>
            <Link href="/" className={styles.custom_link}>
              Home
            </Link>
          </Box>
          <Box className={styles.link_wrapper}>
            <Link href="/" className={styles.custom_link}>
              About Us
            </Link>
          </Box>
          <Box className={styles.link_wrapper}>
            <Link href="/" className={styles.custom_link}>
              Our Approach
            </Link>
          </Box>
        </Box>
        <Box className={styles.contact_us_wrapper}>
          <Typography className={styles.contact_us_title}>
            Contact Us
          </Typography>
          <Box className={styles.info_wrapper}>
            <FontAwesomeIcon
              className={styles.icon_style}
              icon={faPhone}
            ></FontAwesomeIcon>
            <Box className={styles.info_style} width={'100%'}>
              {contact?.phone}
            </Box>
          </Box>
          <Box className={styles.info_wrapper}>
            <FontAwesomeIcon
              className={styles.icon_style}
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <Box className={styles.info_style} width={'100%'}>
              {contact?.email}
            </Box>
          </Box>
          <Box className={styles.info_wrapper}>
            <FontAwesomeIcon
              className={styles.icon_style}
              icon={faLocationDot}
              style={{ paddingLeft: '2px' }}
            ></FontAwesomeIcon>
            <Box className={styles.info_style} width={'100%'}>
              {contact?.address}
            </Box>
          </Box>
          <Box className={styles.info_wrapper}>
            <Link
              className={styles.custom_link}
              href="https://www.facebook.com/optimized.closets"
              target="_blank"
            >
              <Image
                src={'/images/facebook.webp'}
                width={18}
                height={18}
                alt="facebook"
              />
            </Link>
            <Box className={styles.info_style} width={'100%'}>
              <Link
                className={styles.custom_link}
                href={contact?.facebook || ''}
                target="_blank"
              >
                Optimized Home
              </Link>
            </Box>
          </Box>
          <Box className={styles.info_wrapper}>
            <Link
              className={styles.custom_link}
              href="https://www.instagram.com/optimized.closets/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              target="_blank"
            >
              <Image
                src={'/images/instagram.webp'}
                width={18}
                height={18}
                alt="facebook"
              />
            </Link>
            <Box className={styles.info_style} width={'100%'}>
              <Link
                className={styles.custom_link}
                href={contact?.instagram || ''}
                target="_blank"
              >
                Optimized Home
              </Link>
            </Box>
          </Box>
        </Box>
        <Box className={styles.subscribe_wrapper}>
          <Typography className={styles.contact_us_title}>Subscribe</Typography>
          <TextField
            size="small"
            fullWidth
            value={''}
            placeholder="Enter your email"
            InputProps={{
              style: {
                height: '40px',
                backgroundColor: '#fff',
              },
            }}
          />
          <Box className={styles.button_wrapper}>
            <PrimaryButton isContrast>Subscribe</PrimaryButton>
          </Box>
        </Box>
      </Box>
      <Box className={styles.bottom_subscribe_wrapper}>
        <Typography className={styles.contact_us_title}>Subscribe</Typography>
        <TextField
          size="small"
          fullWidth
          value={''}
          placeholder="Enter your email"
          InputProps={{
            style: {
              height: '40px',
              backgroundColor: '#fff',
            },
          }}
        />
        <Box className={styles.button_wrapper}>
          <PrimaryButton>Subscribe</PrimaryButton>
        </Box>
      </Box>
      <Box className={styles.copy_write_wrapper}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <FontAwesomeIcon
            className={styles.icon_style}
            icon={faCopyright}
            fontSize={'10px'}
          />
          <span>Copyright 2023 Optimized Home Inc - All Rights Reserved</span>
        </div>
      </Box>
    </Box>
  );
};
