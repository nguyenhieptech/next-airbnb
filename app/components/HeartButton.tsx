'use client';

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from '../store/api';
import { Loader } from './Loader';
import { loginModalRef } from './modals';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export function HeartButton(props: HeartButtonProps) {
  const { listingId, currentUser } = props;
  const router = useRouter();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const [createFavoriteMutation, createFavoriteResult] =
    useCreateFavoriteMutation();

  const [deleteFavoriteMutation, deleteFavoriteResult] =
    useDeleteFavoriteMutation();

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModalRef.current?.open();
      }

      try {
        if (hasFavorite) {
          await deleteFavoriteMutation({ id: listingId });
          toast.success('Removed favorite');
        } else {
          await createFavoriteMutation({ id: listingId });
          toast.success('Added favorite');
        }
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
      }
    },
    [currentUser, hasFavorite, listingId, loginModalRef.current, router]
  );

  return (
    <div
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? 'fill-primary' : 'fill-neutral-400'}
      />
      <div className="absolute bottom-4 right-4">
        <Loader
          show={
            createFavoriteResult.isLoading || deleteFavoriteResult.isLoading
          }
        />
      </div>
    </div>
  );
}
