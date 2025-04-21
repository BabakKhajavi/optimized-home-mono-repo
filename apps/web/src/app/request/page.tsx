import { ICity, ISubcategory } from '@packages/common';

import { Box } from '@mui/material';
import { RequestForm } from '../modules/request/request-form';
import { get } from '../../utils/api';

export async function generateMetadata() {
  return {
    title: `Request Free Consultation`,
    description: 'Request consultation',
  };
}

export default async function Page() {
  const cities: ICity[] = await get<ICity[]>(`city`, {}, 'no-store', 'cors');
  const subcategories: ISubcategory[] = await get<ISubcategory[]>(
    `subcategory`,
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
        }}
      >
        <RequestForm cities={cities} subcategories={subcategories} />
      </Box>
    </>
  );
}
