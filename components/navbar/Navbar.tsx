import { SafeUser } from '@/types';
import { Container } from '../Container';
import { Categories } from './Categories';
import { Logo } from './Logo';
import { Search } from './Search';
import { UserMenu } from './UserMenu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export function Navbar({ currentUser }: NavbarProps) {
  return (
    <header className="sticky z-10 w-full bg-neutral-50 shadow-sm">
      <nav className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </nav>
      <Categories />
    </header>
  );
}
