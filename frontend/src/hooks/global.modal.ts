import { useState } from "react";

export const useModal = (initialValue: boolean = false): [boolean, () => void] => {
    const [isOpen, setIsOpen] = useState<boolean>(initialValue);

    const openModal = (): void => setIsOpen(true);
   setTimeout(() => {
    setIsOpen(false);
   }, 2800)

    return [isOpen, openModal];
};