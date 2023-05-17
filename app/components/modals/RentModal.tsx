'use client';

import { useRentModal } from '@/app/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { CategoryInput } from '../inputs';
import { categories } from '../navbar/Categories';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export function RentModal() {
  const rentModal = useRentModal();

  function close() {
    rentModal.close();
  }

  const [step, setStep] = useState(STEPS.CATEGORY);

  function handleBack() {
    setStep((previousStep) => previousStep - 1);
  }

  function handleNext() {
    setStep((previousStep) => previousStep + 1);
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
    },
  });

  const category = watch('category');

  function setCustomValue(name: string, value: any) {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  const router = useRouter();

  function renderBodyContent() {
    if (step === STEPS.CATEGORY) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
          <Button onClick={handleNext}>Next</Button>
        </div>
      );
    } else if (step === STEPS.LOCATION) {
      return <div>LOCATION</div>;
    } else if (step === STEPS.INFO) {
      return <div>INFO</div>;
    } else if (step === STEPS.IMAGES) {
      return <div>IMAGES</div>;
    } else if (step === STEPS.DESCRIPTION) {
      return <div>DESCRIPTION</div>;
    } else {
      return <div>PRICE</div>;
    }
  }

  return (
    <Transition appear show={rentModal.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all md:w-[768px]">
                <div className="flex h-16 items-center justify-between px-6">
                  <button className="w-4 focus:outline-none" onClick={close}>
                    <IoMdClose size={18} />
                  </button>
                  <p className="font-semibold text-text-primary">
                    Airbnb you home
                  </p>
                  <div className="w-4" />
                </div>
                <div className="h-[1px] bg-neutral-200" />

                <div className="p-6">{renderBodyContent()}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
