'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, createRef, useImperativeHandle, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../Button';
import { Input } from '../inputs';
import { loginModalRef } from './LoginModal';

export interface SignUpModalRefProps {
  open: () => void;
  close: () => void;
}

export const signUpModalRef = createRef<SignUpModalRefProps>();

export function SignUpModal() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  function handleOpenLogin() {
    close();
    loginModalRef.current?.open();
  }

  useImperativeHandle(
    signUpModalRef,
    () => ({
      open,
      close,
    }),
    []
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            role="overlay"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all md:w-[568px]">
                <div className="flex h-16 items-center justify-between px-6">
                  <button className="w-4 focus:outline-none" onClick={close}>
                    <IoMdClose size={18} />
                  </button>
                  <p className="font-semibold text-neutral-700">Sign up</p>
                  <div className="w-4" />
                </div>

                <div className="h-[1px] bg-neutral-200" />

                <div className="p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-neutral-700"
                  >
                    Welcome to Airbnb
                  </Dialog.Title>

                  <div className="mt-4 space-y-4">
                    <Input label="Email" type="email" />
                    <Input label="Name" type="text" />
                    <Input label="Password" type="password" />
                  </div>

                  <div className="mt-4 space-y-4">
                    <Button>Continue</Button>
                    <div className="h-[1px] bg-neutral-200" />
                    <Button variant="outline" startIcon={FcGoogle}>
                      Continue with Google
                    </Button>
                    <Button variant="outline" startIcon={AiFillGithub}>
                      Continue with Github
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-row items-center justify-center space-x-1">
                    <p className="text-xs text-text-secondary">
                      Already have an account?
                    </p>
                    <button
                      className="cursor-pointer rounded-lg p-1 text-xs font-medium text-text-primary focus:outline focus:outline-text-primary"
                      role="button"
                      onClick={handleOpenLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
