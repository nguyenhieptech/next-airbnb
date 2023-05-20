import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { getCurrentUser } from './actions';
import { Navbar } from './components';
import './globals.css';
import { AppProvider } from './providers';

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
