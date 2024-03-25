import { getCurrentUser } from '@/app/actions';
import { Navbar } from '@/components';
import { AppProvider } from '@/providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const font = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'NextJS Airbnb Clone',
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout(props: Props) {
  const { children } = props;
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <AppProvider>
          <Navbar currentUser={currentUser} />
          <main className="pb-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
