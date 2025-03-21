'use client';

import { ReactNode } from 'react';

export const Header2 = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="text-xl font-semibold mt-2 mb-1">
      {children}
    </div>
  );
}

