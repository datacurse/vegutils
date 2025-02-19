'use client';

import { ReactNode } from 'react';

export const Code = ({ children }: { children?: ReactNode }) => {
  return (
    <span className="inline px-1.5 w-fit justify-center bg-code-bg items-center ring-1 ring-inset ring-code-border rounded text-[.875em]">
      {children}
    </span>
  );
}

