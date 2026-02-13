import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Modal from '../Modal/Modal';
import './CheckoutModal.css';

const DELIVERY_FEE = 50;

const CheckoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);

  const itemsInCart = useMemo(
    () => food_list.filter((item) => cartItems[item._id] > 0),
    [food_list, cartItems]
  );

  const itemsCount = useMemo(
    () => Object.values(cartItems).reduce((sum, qty) => sum + (qty || 0), 0),
    [cartItems]
  );

  const subtotal = getTotalCartAmount();
  const total = subtotal + DELIVERY_FEE;

  const onProceed = () => {
    onClose();
    navigate('/order');
  };

  return (
    <Modal isOpen={isOpen} title='Checkout Summary' onClose={onClose}>
      <div className='checkout-modal'>
        <div className='checkout-modal-summary'>
          <div className='checkout-modal-row'>
            <p>Items</p>
            <p>{itemsCount}</p>
          </div>
          <div className='checkout-modal-row'>
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className='checkout-modal-row'>
            <p>Delivery</p>
            <p>₹{DELIVERY_FEE}</p>
          </div>
          <div className='checkout-modal-row checkout-modal-total'>
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </div>

        <hr className='checkout-modal-divider' />

        <div className='checkout-modal-items' aria-label='Items in cart'>
          {itemsInCart.map((item) => (
            <div key={item._id} className='checkout-modal-item'>
              <p className='checkout-modal-item-name'>{item.name}</p>
              <p className='checkout-modal-item-qty'>x{cartItems[item._id]}</p>
            </div>
          ))}
        </div>

        <div className='checkout-modal-actions'>
          <button type='button' className='checkout-modal-btn secondary' onClick={onClose}>
            Continue Shopping
          </button>
          <button type='button' className='checkout-modal-btn primary' onClick={onProceed}>
            Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
