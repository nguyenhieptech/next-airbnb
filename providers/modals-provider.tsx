import { LoginModal, RentModal, SearchModal, SignUpModal } from '@/components';

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
