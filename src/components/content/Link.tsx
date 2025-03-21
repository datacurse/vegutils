'use client';
import { ReactNode } from 'react';

export const Link = ({ 
  children, 
  href, 
  target = "_blank" 
}: { 
  children?: ReactNode;
  href: string;
  target?: string;
}) => {
  return (
    <a 
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="underline text-text-accent"
    >
      {children}
    </a>
  );
}
