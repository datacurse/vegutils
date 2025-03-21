'use client';

import { ReactNode } from 'react';

export const Header1 = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="text-2xl font-semibold">
      {children}
    </div>
  );
}

