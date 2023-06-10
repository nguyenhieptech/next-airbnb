import { LoginModal, RentModal, SignUpModal } from '../components';

export function ModalsProvider() {
  return (
    <>
      <RentModal />
      <LoginModal />
      <SignUpModal />
    </>
  );
}
