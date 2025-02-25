// LayoutClient.tsx
'use client';

import '@/styles.css';
import { useSnapshot } from 'valtio';
import { store } from '@/stores/store';
import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import HamburgerPopup from './HamburgerPopup';
import Header from './Header';

export const LayoutClient = ({ children }: { children: ReactNode }) => {
  const snap = useSnapshot(store);

  return (
    <div className="font-['Nunito']">
      <Header />
      <div className="flex flex-row items-stretch">
        <div className='hw-[300px] min-w-[300px] p-2 hidden lg:block'>
          <Sidebar />
        </div>
        <div className="w-[1px] bg-gray-200" />
        {snap.hamburger ? (
          <HamburgerPopup />
        ) : (
          <main className="p-4">{children}</main>
        )}
      </div>
    </div>
  );
};
