import { ModalState } from '@/types';
import { create } from 'zustand';

export const useRentModal = create<ModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
