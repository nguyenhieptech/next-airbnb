'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value?: number;
  onChange: (value: number) => void;
}

export function Counter(props: CounterProps) {
  const { title, subtitle, value, onChange } = props;

  const onAdd = useCallback(() => {
    onChange(value! + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value! - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-sm font-light text-text-secondary">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-lg font-light text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
