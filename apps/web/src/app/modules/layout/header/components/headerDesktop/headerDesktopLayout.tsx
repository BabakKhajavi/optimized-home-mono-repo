'use client';
import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './headerDesktopLayout.module.scss';
import Image from 'next/image';
import { PrimaryButton } from '@packages/atoms';
import HorizontalMenu from '../../horizontalMenu/horizontalMenu';
import { HeaderLayoutProps } from '../../../../../../types';

const HeaderDesktopLayout: FC<HeaderLayoutProps> = ({ menuList }) => {
  const router = useRouter();
  const [localMenuList, setLocalMenuList] = useState<typeof menuList>(menuList);
  const handleClickOpenRequestModal = () => {
    router.push('/request');
  };
  return (
    <div className={styles.desktop_header_wrapper}>
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
        </div>
        <div className={styles.menu_wrapper}>
          <Link className={styles.menu_itemlink} href="/">
            Home
          </Link>
          {localMenuList.length > 0 &&
            localMenuList.map((item: any, index: number) => (
              <span key={`item-${index}`}>
                <HorizontalMenu menuItem={item} />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktopLayout;
