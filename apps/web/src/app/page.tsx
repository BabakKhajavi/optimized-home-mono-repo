import type { Metadata } from 'next';
import { WelcomeContainer } from './modules/welcome';
import { GalleryContainer } from './modules/gallery';
export const metadata: Metadata = {
  title: 'Optimized Closets',
  description: 'Generated by create next app',
};
export default async function Page() {
  return (
    <>
      <section>
        <WelcomeContainer />
        <GalleryContainer />
      </section>
    </>
  );
}
