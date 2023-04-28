'use client';

import { ReactNode } from 'react';
import { ModalsProvider } from './ModalsProvider';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <ModalsProvider />
      <ThemeProvider />
      {children}
    </StoreProvider>
  );
}
