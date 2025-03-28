'use client';
import { FC, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './headerDesktopLayout.module.scss';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from '@packages/atoms';
import HorizontalMenu from '../../horizontalMenu/horizontalMenu';
import { ICategory } from '@packages/common';
import { HeaderLayoutProps } from '../../../../../types';

const HeaderDesktopLayout: FC<HeaderLayoutProps> = ({ menuList }) => {
  const router = useRouter();
  console.log('menuList', menuList);
  const [localMenuList, setLocalMenuList] = useState<typeof menuList>(menuList);
  const handleClickOpenRequestModal = () => {
    // gaEvent({
    //   action: 'click_get_started',
    //   label: 'Get Started (Header)',
    // });
    router.push('/request');
  };
  return (
    <div className={styles.desktop_header_wrapper}>
      <div className={styles.left_wrapper}>
        <Link href={'/'} as={'image'}>
          <Image
            src={'/images/main-logo.webp'}
            alt="a golden closet logo"
            width={400}
            height={81}
            priority
          />
        </Link>
      </div>
      <div className={styles.right_wrapper}>
        <div className={styles.info_wrapper}>
          <div className={styles.info_cell_lg}>
            <FormControl
              fullWidth
              sx={{
                width: '100%',
                height: '28px',
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
              variant="outlined"
              size="small"
              disabled
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment
                    id="search-adorment"
                    style={{ backgroundColor: 'white' }}
                    position="end"
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ width: '14px' }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  style: {
                    height: '12px',
                    width: '100%',
                    fontSize: '12px',
                    lineHeight: '12px',
                    // backgroundColor: 'pink',
                  },
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell_icon}>
            <Link
              href="https://www.instagram.com/optimized.closets/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              target="_blank"
              style={{ paddingTop: '2px' }}
              as={'image'}
            >
              <Image
                className={styles.icon}
                src={'/images/instagram.webp'}
                width={20}
                height={20}
                alt="instagram"
              />
            </Link>
          </div>
          <div className={styles.info_cell_icon}>
            <Link
              href="https://www.facebook.com/optimized.closets"
              target="_blank"
              style={{ paddingTop: '2px' }}
              as={'image'}
            >
              <Image
                className={styles.icon}
                src={'/images/facebook.webp'}
                width={20}
                height={20}
                alt="facebook"
              />
            </Link>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell}>
            <PrimaryButton>
              <a href="tel:+14168935540" className={styles.phone_link}>
                Call Us Now
              </a>
            </PrimaryButton>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell_md}>
            <PrimaryButton onClick={handleClickOpenRequestModal}>
              Free Consultation
            </PrimaryButton>
          </div>
        </div>
        <div className={styles.menu_wrapper}>
          <Link className={styles.menu_itemlink} href="/">
            Home
          </Link>
          {localMenuList.length > 0 &&
            localMenuList.map((item: any, index: number) => (
              <div key={`item-${index}`}>
                <HorizontalMenu menuItem={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktopLayout;
