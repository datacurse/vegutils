'use client';

import { ReactNode } from 'react';

export const Description = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="text-lg text-text-muted">
      {children}
    </div>
  );
}

