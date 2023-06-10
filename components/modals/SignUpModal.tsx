'use client';

import { useSignUpMutation } from '@/store/api';
import { APIRequestSignUp } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { signIn } from 'next-auth/react';
import { Fragment, createRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../Button';
import { Input } from '../inputs';
import { loginModalRef } from './LoginModal';

export interface SignUpModalRef {
  open: () => void;
  close: () => void;
}

export const signUpModalRef = createRef<SignUpModalRef>();

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

  const [signUpMutation, signUpResult] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<APIRequestSignUp>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: APIRequestSignUp) => {
    try {
      const response = await signUpMutation(data);
      close();
      reset();
      toast.success('Signed up successfully!');
    } catch (error) {
      toast.error('Cannot sign up. Please try again.');
    }
  };

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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all md:w-[576px]">
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

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 space-y-4">
                      <Input
                        {...register('email')}
                        label="Email"
                        type="email"
                        disabled={signUpResult.isLoading}
                      />
                      <Input
                        {...register('name')}
                        label="Name"
                        type="text"
                        disabled={signUpResult.isLoading}
                      />
                      <Input
                        {...register('password')}
                        label="Password"
                        type="password"
                        disabled={signUpResult.isLoading}
                      />
                    </div>

                    <div className="mt-4 space-y-4">
                      <Button type="submit">Continue</Button>
                      <div>{signUpResult.isLoading ? 'Loading' : null}</div>
                      <div className="h-[1px] bg-neutral-200" />
                      <Button
                        variant="outline"
                        startIcon={FcGoogle}
                        onClick={() => signIn('google')}
                      >
                        Continue with Google
                      </Button>
                      <Button
                        variant="outline"
                        startIcon={AiFillGithub}
                        onClick={() => signIn('github')}
                      >
                        Continue with Github
                      </Button>
                    </div>
                  </form>

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
