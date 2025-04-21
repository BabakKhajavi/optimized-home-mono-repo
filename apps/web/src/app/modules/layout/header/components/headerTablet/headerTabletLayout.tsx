'use client';
import { FC } from 'react';
import Link from 'next/link';
import styles from './headerTabletLayout.module.scss';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../../../../../providers';
import { HeaderLayoutProps } from '../../../../../../types';
import { PrimaryButton } from '@packages/atoms';

const HeaderTabletLayout: FC<HeaderLayoutProps> = () => {
  const { isSideMenuOpen, toggleSideMenu } = useStore();
  const handleClickOpenRequestModal = () => {
    // gaEvent({
    //   action: 'click_get_started',
    //   label: 'Get Started (Header)',
    // });
  };
  const displayMenu = () => {
    toggleSideMenu();
  };
  return (
    <div className={styles.tablet_header_wrapper}>
      <div className={styles.left_wrapper}>
        <Link href={'/'} as={'image'}>
          <Image
            src={'/images/main-logo.png'}
            alt="a golden closet logo"
            width={400}
            height={81}
            priority
          />
        </Link>
      </div>
      <div className={styles.right_wrapper}>
        <div className={styles.info_wrapper}>
          <div className={styles.info_cell}>
            <PrimaryButton isContrast>
              <a href="tel:+14168935540" className={styles.phone_link}>
                Call Us Now
              </a>
            </PrimaryButton>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell_md}>
            <PrimaryButton onClick={handleClickOpenRequestModal} isContrast>
              Free Consultation
            </PrimaryButton>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell_icon_lg}>
            <FontAwesomeIcon icon={faList} onClick={displayMenu} />
          </div>
        </div>
        <div className={styles.menu_wrapper}>
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
        </div>
      </div>
    </div>
  );
};

export default HeaderTabletLayout;
