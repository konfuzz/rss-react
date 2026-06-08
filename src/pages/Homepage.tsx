import { useRef } from 'react';

import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import SubmissionsList from '../components/SubmissionsList/SubmissionsList';

export default function Homepage() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <main>
      <h1>RSS React forms</h1>
      <SubmissionsList />
      <Button onClick={() => dialogRef.current?.showModal()}>
        Open Modal
      </Button>
      <Modal ref={dialogRef} onClose={() => dialogRef.current?.close()}>
        <div className="modal-container">
          <h2>Modal</h2>
        </div>
      </Modal>  
    </main>
  );
}