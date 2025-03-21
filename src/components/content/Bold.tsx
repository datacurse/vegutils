'use client';

import { ReactNode } from 'react';

export const Bold = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="inline-block font-bold">
      {children}
    </div>
  );
}

