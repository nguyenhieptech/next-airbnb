'use client';

import { formattedCountries } from '@/app/hooks';
import { classNames } from '@/app/utils';
import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { BsChevronExpand } from 'react-icons/bs';

export type SelectedCountry = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type SelectCountryInputProps = {
  value?: SelectedCountry | null;
  onChange: (value: SelectedCountry) => void;
};

export function SelectCountryInput(props: SelectCountryInputProps) {
  const { value, onChange } = props;
  const [query, setQuery] = useState('');

  const filteredCountriesMemo = useMemo(() => {
    return query === ''
      ? formattedCountries
      : formattedCountries.filter((country) =>
          country.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  }, [query]);

  return (
    <div>
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="border-text-neutral-500 relative w-full cursor-default overflow-hidden rounded-md border bg-white text-sm focus:border-2 focus:outline-none">
            <Combobox.Input
              className="w-full border-none py-2 pl-4 pr-10 text-sm leading-5 text-text-primary focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(value: SelectedCountry) =>
                `${value.flag}  ${value.label}`
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand className="text-lg text-text-primary" />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onChange(value as SelectedCountry)}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredCountriesMemo?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-text-primary">
                  No country found
                </div>
              ) : (
                filteredCountriesMemo.map((value) => {
                  return (
                    <Combobox.Option
                      key={value.label}
                      value={value}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none px-4 py-2',
                          active ? 'bg-primary text-white' : 'text-text-primary'
                        )
                      }
                    >
                      {({ selected }) => (
                        <div className="flex flex-row space-x-2">
                          <span>{value.flag}</span>
                          <span
                            className={classNames(
                              'truncate',
                              selected ? 'font-medium' : 'font-normal'
                            )}
                          >
                            {value.label}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
