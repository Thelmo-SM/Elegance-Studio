import React from 'react';
import Style from '../../../styles/global.modal.module.css';

interface GlobalModalProps {
  children: React.ReactNode;
  isOpens: boolean;
  closeModal: () => void;
}

export const GlobalModal: React.FC<GlobalModalProps> = ({ children, isOpens, closeModal }) => {
  return (
    <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
      <div className={Style.modalContainer}>
        <button className={Style.modalClose} onClick={closeModal}>X</button>
        {children}
      </div>
    </article>
  );
};

export default GlobalModal;