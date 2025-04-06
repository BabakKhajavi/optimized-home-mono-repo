import { get } from '../../../utils/api';
import { Gallery } from './gallery';
import { GallerySubcategoryResponse } from '../../../types/interfaces';
import styles from './gallery.module.scss';
export const GalleryContainer: React.FC = async () => {
  const galleries: GallerySubcategoryResponse[] = await get<
    GallerySubcategoryResponse[]
  >(`gallery`, {}, 'no-store', 'cors');
  console.log('galleries', galleries);
  const filteredMainGalleries = galleries.filter(
    (gallery) => gallery.is_main === true,
  );
  return (
    <div className={styles.container}>
      {galleries.length > 0 && <Gallery galleries={filteredMainGalleries} />}
    </div>
  );
};
