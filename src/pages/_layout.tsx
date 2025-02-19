import '../styles.css';

import type { ReactNode } from 'react';

import { Footer } from '../components/footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/sidebar';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-['Nunito']">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <Header />
      <div className="flex flex-row min-w-0 mx-auto">
        <Sidebar />
        <main className="min-w-0 flex-1 max-w-[1654px] py-8 px-24">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
