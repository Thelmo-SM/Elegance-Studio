"use client";

import { createContext, useContext, ReactNode } from "react";
import { useModal } from "@/hooks/global.modal";

type ModalContextProps = {
  isOpen: boolean;
  openModal: () => void;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, openModal] = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, openModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
