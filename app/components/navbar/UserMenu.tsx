'use client';

import { classNames } from '@/app/utils';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../Avatar';
import { MenuItem } from './MenuItem';

export function UserMenu() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('');

  // https://headlessui.com/react/menu

  return (
    <Menu as="div" className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className={classNames(
            'normal-4 hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-neutral-800 transition duration-200 hover:bg-neutral-100 md:block'
          )}
        >
          Airbnb your home
        </div>

        <Menu.Button className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md focus:outline focus:outline-1 focus:outline-neutral-700 md:px-2 md:py-1">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser} />
            {/* // TODO: Check later */}
            {/* <Avatar src={currentUser?.image} /> */}
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
                  // onClick={rentModal.onOpen}
                />
                <div className="h-[1px] bg-gray-100" />
                <MenuItem
                  label="Logout"
                  // onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Sign up"
                  // onClick={registerModal.onOpen}
                />
                <MenuItem
                  label="Login"
                  // onClick={loginModal.onOpen}
                />
                <div className="h-[1px] bg-gray-100" />
                <MenuItem
                  label="Airbnb your home"
                  // onClick={rentModal.onOpen}
                />
                <MenuItem
                  label="Help"
                  // onClick={rentModal.onOpen}
                />
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
