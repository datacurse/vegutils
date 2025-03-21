'use client';

import { ReactNode } from 'react';

export const Text = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="">
      {children}
    </div>
  );
}


