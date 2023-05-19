'use client';

import {
  Button,
  CategoryInput,
  Counter,
  Heading,
  ImageUpload,
  Input,
  Loader,
  SelectCountryInput,
  SelectedCountry,
} from '@/app/components';
import { useRentModal } from '@/app/hooks';
import { useCreateListingMutation } from '@/app/store/api';
import { categories } from '@/app/utils';
import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type RentFormData = Partial<{
  category: string;
  location: SelectedCountry;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}>;

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
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentFormData>({
    defaultValues: {
      category: '',
      location: {
        flag: '',
        label: '',
        latlng: [1, 1],
        region: '',
        value: '',
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  function setCustomValue(name: keyof RentFormData, value: any) {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  const router = useRouter();

  const [createListingMutation, createListingResult] =
    useCreateListingMutation();

  const onSubmit: SubmitHandler<RentFormData> = async (data) => {
    try {
      await createListingMutation(data);
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.close();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  function renderBodyContent() {
    if (step === STEPS.CATEGORY) {
      return (
        <div className="flex flex-col gap-6">
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
      return (
        <div className="relative flex h-[512px] flex-col gap-6">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <SelectCountryInput
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <Map center={location?.latlng} />

          <div className="absolute inset-x-0 bottom-0 flex flex-row space-x-2">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      );
    } else if (step === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-6">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenitis do you have?"
          />
          <Counter
            onChange={(value) => setCustomValue('guestCount', value)}
            value={guestCount}
            title="Guests"
            subtitle="How many guests do you allow?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue('roomCount', value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you have?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue('bathroomCount', value)}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
          />
          <div className="flex flex-row space-x-2">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      );
    } else if (step === STEPS.IMAGES) {
      return (
        <div className="flex flex-col gap-6">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />
          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />
          <div className="flex flex-row space-x-2">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      );
    } else if (step === STEPS.DESCRIPTION) {
      return (
        <div className="flex flex-col gap-6">
          <Heading
            title="How would you describe your place?"
            subtitle="Short and sweet works best!"
          />
          <Input {...register('title')} label="Title" />
          <Input {...register('description')} label="Description" />
          <div className="flex flex-row space-x-2">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-6">
          <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night?"
          />
          <Input {...register('price')} type="number" label="Price" />
          <div className="flex flex-row space-x-2">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </div>
          <Loader show={createListingResult.isLoading} />
        </div>
      );
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
              <Dialog.Panel className="w-full transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all md:w-[640px]">
                <div className="flex h-16 items-center justify-between px-6">
                  <button className="w-4 focus:outline-none" onClick={close}>
                    <IoMdClose size={18} />
                  </button>
                  <p className="text-base font-semibold text-text-primary">
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
