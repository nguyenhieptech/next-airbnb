import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ClientOnly, Navbar } from './components';
import './globals.css';

const font = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Airbnb',
  description: 'Next.js 13 Airbnb Clone',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
