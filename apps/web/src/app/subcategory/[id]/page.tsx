import { ISubcategory } from '@packages/common';

import { get } from '../../../utils/api';
import { Subcategory } from '../../modules/subcategory/subcategory';
import { Box } from '@mui/material';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const subcategory: ISubcategory = await get<ISubcategory>(
    `subcategory/${id}`,
    {},
    'no-store',
    'cors',
  );

  return {
    title: `${subcategory.title} Closet`,
    description:
      subcategory.description ||
      'Optimized Closets - Custom Closets for Every Space',
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const subcategory: ISubcategory = await get<ISubcategory>(
    `subcategory/${id}`,
    {},
    'no-store',
    'cors',
  );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 8%',
          backgroundColor: '#dedede',
        }}
      >
        {subcategory && <Subcategory subcategory={subcategory} />}
      </Box>
    </>
  );
}
