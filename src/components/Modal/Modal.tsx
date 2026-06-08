import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

interface ModalProps {
  onClose: () => void,
  children?: React.ReactNode
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ onClose, children }, ref) => {

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <dialog ref={ref} onClose={onClose} onClick={handleClick}>
      {children}
      <button onClick={onClose} className="close-dialog" type="button">✕</button>
    </dialog>,
    document.body
  );
});

Modal.displayName = 'Modal';

export default Modal;