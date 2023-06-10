'use client';

import { useRentModal } from '@/hooks';
import { SafeUser } from '@/types';
import { classNames } from '@/utils';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../Avatar';
import { loginModalRef, signUpModalRef } from '../modals';
import { MenuItem } from './MenuItem';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export function UserMenu({ currentUser }: NavbarProps) {
  const router = useRouter();
  const rentModal = useRentModal();

  function handleClickOnRent() {
    if (!currentUser) {
      loginModalRef.current?.open();
    } else {
      rentModal.open();
    }
  }

  return (
    <Menu as="div" className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className={classNames(
            'hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-text-primary transition duration-200 hover:bg-neutral-100 md:block'
          )}
          onClick={handleClickOnRent}
        >
          Airbnb your home
        </div>

        <Menu.Button className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md focus:outline focus:outline-1 focus:outline-neutral-700 md:px-2 md:py-1">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="md:w-50 absolute right-0 z-20 w-52 overflow-hidden rounded-xl bg-white text-sm shadow-md focus:outline-none">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem
                  label="Airbnb your home"
                  onClick={() => rentModal.open()}
                />
                <div className="h-[1px] bg-gray-100" />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Sign up"
                  onClick={() => signUpModalRef.current?.open()}
                />
                <MenuItem
                  label="Login"
                  onClick={() => loginModalRef.current?.open()}
                />
                <div className="h-[1px] bg-gray-100" />
                <MenuItem
                  label="Airbnb your home"
                  onClick={handleClickOnRent}
                />
                <MenuItem label="Help" />
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
