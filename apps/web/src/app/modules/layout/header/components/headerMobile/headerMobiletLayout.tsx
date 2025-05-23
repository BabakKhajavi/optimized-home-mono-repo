'use client';
import { FC } from 'react';
import Link from 'next/link';
import styles from './headerMobileLayout.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '@packages/atoms';
import { HeaderLayoutProps } from '../../../../../../types';
import { useStore } from '../../../../../../providers';
import Image from 'next/image';
const HeaderMobileLayout: FC<HeaderLayoutProps> = ({
  toggleSideMenuChecked,
}) => {
  const { toggleSideMenu } = useStore();
  const handleClickOpenRequestModal = () => {
    // gaEvent({
    //   action: 'click_get_started',
    //   label: 'Get Started (Header)',
    // });
    // router.push('/request');
  };
  const displaySideMenu = () => {
    toggleSideMenu();
  };
  return (
    <div className={styles.mobile_header_wrapper}>
      <div className={styles.info_wrapper}>
        <div className={styles.left_wrapper}>
          <Link href={'/'} as={'image'} className={styles.left_wrapper}>
            <Image
              className={styles.logo_img}
              src={'/images/main-logo.png'}
              alt="a golden closet logo"
              width={197}
              height={40}
              priority
            />
          </Link>
        </div>
        <div className={styles.right_wrapper}>
          <Link
            href="https://www.instagram.com/optimized.closets/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
            target="_blank"
            className={styles.social_media_link}
            as={'image'}
          >
            <Image
              className={styles.icon}
              src={'/images/instagram.webp'}
              width={25}
              height={25}
              alt="instagram"
            />
          </Link>
          <Link
            href="https://www.facebook.com/optimized.closets"
            target="_blank"
            className={styles.social_media_link}
            as={'image'}
          >
            <Image
              className={styles.icon}
              src={'/images/facebook.webp'}
              width={25}
              height={25}
              alt="facebook"
            />
          </Link>
          <div className={styles.info_cell_icon}>
            <FontAwesomeIcon icon={faList} onClick={displaySideMenu} />
          </div>
        </div>
      </div>
      <div className={styles.menu_wrapper}>
        <PrimaryButton isContrast fullWidth>
          <a href="tel:+14168935540" className={styles.phone_link}>
            Call Us Now
          </a>
        </PrimaryButton>
        <PrimaryButton
          onClick={handleClickOpenRequestModal}
          isContrast
          fullWidth
        >
          Free Consultation
        </PrimaryButton>
      </div>
    </div>
  );
};

export default HeaderMobileLayout;
