import { createContext, useContext } from 'react';

type ModalContext = {
  onClose?: () => void;
};

export const ModalContext = createContext<ModalContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useModalContext(): ModalContext {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext should be used within the ModalContext provider!');
  }

  return context;
}