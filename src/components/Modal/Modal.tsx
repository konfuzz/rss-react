import { useRef, useEffect } from 'react';
import './modal.css';

export default function Modal({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {children}
      <button onClick={onClose} className="close-dialog" type="button">✕</button>
    </dialog>
  );
}