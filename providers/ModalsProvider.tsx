import { LoginModal, RentModal, SignUpModal, SearchModal } from '@/components';

export function ModalsProvider() {
  return (
    <>
      <RentModal />
      <LoginModal />
      <SignUpModal />
      <SearchModal />
    </>
  );
}
