import React from 'react';
import Style from '../../../styles/global.modal.module.css';

interface GlobalModalProps {
  children: React.ReactNode;
  isOpens: boolean;
}

export const GlobalModal: React.FC<GlobalModalProps> = ({ children, isOpens }) => {
  return (
    <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
      <div className={Style.modalContainer}>
        {children}
      </div>
    </article>
  );
};

export default GlobalModal;