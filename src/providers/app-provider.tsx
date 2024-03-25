'use client';

import {
  ModalsProvider,
  StoreProvider,
  ThemeProvider,
  ToasterProvider,
} from '@/providers';
import { ReactNode } from 'react';

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
