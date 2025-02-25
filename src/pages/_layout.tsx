// _layout.tsx
import type { ReactNode } from 'react';
import { LayoutClient } from '@/components/LayoutClient';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className='h-full'>
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <LayoutClient>{children}</LayoutClient>
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
