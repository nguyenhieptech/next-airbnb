'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// https://github.com/hypeserver/react-date-range

interface Props {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export function Calendar(props: Props) {
  const { value, onChange, disabledDates } = props;

  return (
    <DateRange
      className="w-full"
      direction="vertical"
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      minDate={new Date()}
      onChange={onChange}
      showDateDisplay={false}
      disabledDates={disabledDates}
    />
  );
}
