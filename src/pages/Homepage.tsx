import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <h1>RSS React forms</h1>
      <Button onClick={handleOpen} />
      {createPortal(
        <Modal isOpen={isOpen} onClose={handleClose}>
          <div className="modal-container">
            <h2>Modal</h2>
          </div>
        </Modal>,
        document.body
      )}      
    </>
  );
}