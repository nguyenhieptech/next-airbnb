import { AppProvider } from '@/providers';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Navbar } from '../components';
import { getCurrentUser } from './actions';
import './globals.css';

const font = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Airbnb',
  description: 'Next.js 13 Airbnb Clone',
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout(props: Props) {
  const { children } = props;
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <AppProvider>
          <Navbar currentUser={currentUser} />
          <main className="pb-20">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
