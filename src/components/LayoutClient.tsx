'use client';
import '@/styles.css';
import { useSnapshot } from 'valtio';
import { store } from '@/stores/store';
import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import HamburgerPopup from './HamburgerPopup';
import Header from './Header';
import Separator from './Separator';

export const LayoutClient = ({ children }: { children: ReactNode }) => {
  const snap = useSnapshot(store);
  return (
    <div className="font-['Nunito'] bg-bg text-text flex flex-col h-screen">
      <Header />
      <Separator />
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="min-w-[300px] p-2 hidden md:block overflow-y-auto">
          <Sidebar />
        </div>
        <Separator vertical={true} />
        {snap.hamburger ? (
          <HamburgerPopup />
        ) : (
          <main className="p-4 flex-1 overflow-y-auto">{children}</main>
        )}
      </div>
    </div>
  );
};
