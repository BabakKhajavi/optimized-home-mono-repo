import { IWelcome } from '@packages/common';
import { get } from '../../../utils/api';
import { Box } from '@mui/material';
import { Welcome } from './welcome';

export const WelcomeContainer: React.FC = async () => {
  const welcome: IWelcome[] = await get<IWelcome[]>(
    `welcome`,
    {},
    'no-cache',
    'cors',
    { revalidate: 10 },
  );
  return <>{welcome.length > 0 && <Welcome welcome={welcome[0]} />}</>;
};
