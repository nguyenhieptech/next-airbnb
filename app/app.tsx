import { ClientOnly, Navbar } from './components';
import { AppProvider } from './providers/AppProvider';
import { SafeUser } from './types';

interface AppClientProps {
  currentUser?: SafeUser | null;
}

export function AppClient({ currentUser }: AppClientProps) {
  return (
    <ClientOnly>
      <AppProvider>
        <Navbar currentUser={currentUser} />
      </AppProvider>
    </ClientOnly>
  );
}
