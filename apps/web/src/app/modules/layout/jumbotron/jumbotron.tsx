// import { gaEvent } from '@/utils/gtag';

import styles from './jumbotron.module.scss';
import { get } from '../../../../utils/api';
import { ICategory, IJumbotron } from '@packages/common';
import { JumbotronSwiper } from './components/jumbotron-swiper';

const Jumbotron: React.FC = async () => {
  const jumbotronList: IJumbotron[] = await get<IJumbotron[]>(
    `jumbotron`,
    {}, // No query parameters
    'force-cache', // cacheOptions
    'cors', // revalidateOptions
    { revalidate: 10 }, // nextOptions
  );

  return (
    <div className={styles.wrapper}>
      <JumbotronSwiper jumbotronList={jumbotronList} />
    </div>
  );
};

export default Jumbotron;
