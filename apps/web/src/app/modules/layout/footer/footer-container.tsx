import { get } from '../../../../utils/api';
import { IContact } from '@packages/common';
import { Footer } from './footer';

export const FooterContainer: React.FC = async () => {
  const contacts: IContact[] = await get<IContact[]>(
    `contact`,
    {},
    'force-cache',
    'cors',
    { revalidate: 10 },
  );
  const mainContact = contacts.find((contact) => contact.is_main);
  console.log(mainContact);
  return <Footer contact={mainContact} />;
};
