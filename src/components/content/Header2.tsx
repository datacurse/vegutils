'use client';

import { ReactNode } from 'react';

export const Header2 = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="text-1xl font-semibold">
      {children}
    </div>
  );
}

