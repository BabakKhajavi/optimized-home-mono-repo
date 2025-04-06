import { get } from '../../../utils/api';
import { IApproach } from '@packages/common';
import { Approach } from './approach';
import styles from './approach.module.scss';
export const ApproachContainer: React.FC = async () => {
  const approaches: IApproach[] = await get<IApproach[]>(
    `approach`,
    {},
    'no-store',
    'cors',
  );
  return (
    <div className={styles.container}>
      {approaches.length > 0 && <Approach approaches={approaches} />}
    </div>
  );
};
