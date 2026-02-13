import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ToastContainer.css';

const ToastContainer = () => {
  const { toasts } = useContext(StoreContext);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className='toast-container' aria-live='polite' aria-relevant='additions'>
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type || 'info'}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
