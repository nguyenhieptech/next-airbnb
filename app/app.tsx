import { ClientOnly, Navbar } from './components';
import { AppProvider } from './providers/AppProvider';

export function AppClient() {
  return (
    <ClientOnly>
      <AppProvider>
        <Navbar />
      </AppProvider>
    </ClientOnly>
  );
}
