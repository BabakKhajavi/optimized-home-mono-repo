import { get } from '../../../utils/api';
import { IReview } from '@packages/common';
import { Review } from './review';
import styles from './review.module.scss';
export const ReviewContainer: React.FC = async () => {
  const Reviews: IReview[] = await get<IReview[]>(
    `review`,
    {},
    'no-store',
    'cors',
  );
  const filteredReviews = Reviews.filter((review) => review.is_approved);
  return (
    <div className={styles.container}>
      {Reviews.length > 0 && <Review reviews={filteredReviews} />}
    </div>
  );
};
