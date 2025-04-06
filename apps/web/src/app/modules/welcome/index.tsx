import { IWelcome } from '@packages/common';
import { get } from '../../../utils/api';
import { Welcome } from './welcome';
import styles from './welcome.module.scss';
export const WelcomeContainer: React.FC = async () => {
  const welcome: IWelcome[] = await get<IWelcome[]>(
    `welcome`,
    {},
    'no-cache',
    'cors',
    { revalidate: 10 },
  );
  return (
    <div className={styles.container}>
      {welcome.length > 0 && <Welcome welcome={welcome[0]} />}
    </div>
  );
};
