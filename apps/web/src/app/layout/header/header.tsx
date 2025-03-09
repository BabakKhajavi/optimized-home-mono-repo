// import { gaEvent } from '@/utils/gtag';

import styles from './header.module.scss';
import HeaderDesktopLayout from './components/headerDesktop/headerDesktopLayout';
import HeaderTabletLayout from './components/headerTablet/headerTabletLayout';
import HeaderMobileLayout from './components/headerMobile/headerMobiletLayout';
import { get } from '../../../utils/api';
import { ICategory } from '@packages/common';

const Header: React.FC = async () => {
  const categories: ICategory[] = await get<ICategory[]>('category');
  return (
    <div className={styles.wrapper}>
      <HeaderDesktopLayout menuList={categories} />
      <HeaderTabletLayout menuList={categories} />
      <HeaderMobileLayout menuList={categories} />
    </div>
  );
};

export default Header;
