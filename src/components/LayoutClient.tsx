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
    <div className="font-['Nunito'] bg-bg text-text h-full">
      <Header />
      <div className="border-b-[1px] border-border" />
      <div className="flex flex-row items-stretch">
        <div className='hw-[300px] min-w-[300px] p-2 hidden md:block'>
          <Sidebar />
        </div>
        <div className="border-r-[1px] border-border hidden md:block" />
        {snap.hamburger ? (
          <HamburgerPopup />
        ) : (
          <main className="p-4 h-full">{children}</main>
        )}
      </div>
    </div>
  );
};
