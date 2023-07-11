'use client';

import {
  Button,
  Calendar,
  Counter,
  Heading,
  SelectCountryInput,
  SelectedCountry,
} from '@/components';
import { useSearchModal } from '@/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Fragment, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { IoMdClose } from 'react-icons/io';

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
};

export function SearchModal() {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  function handleBack() {
    setStep((value) => value - 1);
  }

  function handleNext() {
    setStep((value) => value + 1);
  }

  const [location, setLocation] = useState<SelectedCountry>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        ssr: false,
      }),
    /* eslint-disable */
    [location]
  );

  function handleSearch() {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.close();
    router.push(url);
  }

  function renderBodyContent() {
    if (step === STEPS.LOCATION) {
      return (
        <div className="relative flex h-[512px] flex-col gap-6">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location!"
          />
          <SelectCountryInput
            value={location}
            onChange={(value) => setLocation(value)}
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
    } else if (step === STEPS.DATE) {
      return (
        <div className="flex flex-col gap-6">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everyone is free!"
          />
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
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
            title="More information"
            subtitle="Find your perfect place!"
          />
          <Counter
            onChange={(value) => setGuestCount(value)}
            value={guestCount}
            title="Guests"
            subtitle="How many guests are coming?"
          />
          <hr />
          <Counter
            onChange={(value) => setRoomCount(value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you need?"
          />
          <hr />
          <Counter
            onChange={(value) => setBathroomCount(value)}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
          />
          <div className="flex flex-row space-x-2">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      );
    }
  }

  // https://headlessui.com/react/dialog
  return (
    <Transition appear show={searchModal.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={searchModal.close}>
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
          <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                  <button
                    className="w-4 focus:outline-none"
                    onClick={searchModal.close}
                  >
                    <IoMdClose size={18} />
                  </button>
                  <p className="text-base font-semibold text-text-primary">
                    Filters
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
