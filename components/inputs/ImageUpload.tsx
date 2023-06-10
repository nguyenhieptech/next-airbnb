'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'aychn5j7';

type ImageUploadProps = {
  value?: string;
  onChange: (value: string) => void;
};

export function ImageUpload(props: ImageUploadProps) {
  const { onChange, value } = props;

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
            onClick={() => open()}
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold text-text-primary">
              Click to upload
            </div>
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image className="object-cover" fill src={value} alt="House" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
