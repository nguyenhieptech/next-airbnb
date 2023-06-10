'use client';

import { PuffLoader } from 'react-spinners';

type LoaderProps = {
  show: boolean;
};

export function Loader({ show }: LoaderProps) {
  return show ? (
    <div className="flex items-center justify-center">
      <PuffLoader color="#FF385C" />
    </div>
  ) : null;
}
