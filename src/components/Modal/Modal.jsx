import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, title, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className='modal-overlay' role='presentation' onMouseDown={onClose}>
      <div
        className='modal'
        role='dialog'
        aria-modal='true'
        aria-label={title || 'Dialog'}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>
          <button type='button' className='modal-close' onClick={onClose} aria-label='Close dialog'>
            ×
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
