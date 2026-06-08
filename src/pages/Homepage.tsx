import { useRef, useState } from 'react';

import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import SubmissionsList from '../components/SubmissionsList/SubmissionsList';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import ReactHookForm from '../components/ReactHookForm/ReactHookForm';

export default function Homepage() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [ formType, setFormType ] = useState<'Uncontrolled' | 'ReactHook'>('Uncontrolled');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormType(e.currentTarget.dataset.formType as 'Uncontrolled' | 'ReactHook');
    dialogRef.current?.showModal()
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <main>
      <h1>RSS React forms</h1>
      <Button onClick={(e) => handleClick(e)} formType="Uncontrolled">
        Open Uncontrolled Form
      </Button>
      <Button onClick={(e) => handleClick(e)} formType="ReactHook">
        Open React Hook Form
      </Button>
      <SubmissionsList />
      <Modal ref={dialogRef} onClose={handleClose}>
        <div className="modal-container">
          {formType === 'Uncontrolled' ? <UncontrolledForm onClose={handleClose} /> : <ReactHookForm onClose={handleClose} />}
        </div>
      </Modal>  
    </main>
  );
}