'use client';

import { ReactNode } from 'react';
import { ModalsProvider } from './ModalsProvider';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToasterProvider } from './ToastProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <ModalsProvider />
      <ThemeProvider />
      <ToasterProvider />
      {children}
    </StoreProvider>
  );
}
