import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { AppClient } from './app';
import './globals.css';

const font = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Airbnb',
  description: 'Next.js 13 Airbnb Clone',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AppClient />
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
