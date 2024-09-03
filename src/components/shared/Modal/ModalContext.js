import { createContext, useContext } from 'react';
export const ModalContext = createContext(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export function useModalContext() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext should be used within the ModalContext provider!');
    }
    return context;
}
