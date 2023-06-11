import { Categories, Container, Logo, Search, UserMenu } from '@/components';
import { SafeUser } from '@/types';

type NavbarProps = {
  currentUser?: SafeUser | null;
};

export function Navbar({ currentUser }: NavbarProps) {
  return (
    <header className="sticky z-10 w-full bg-white">
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
