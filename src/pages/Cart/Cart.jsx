import { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, deleteFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className='cart'>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      {isCartEmpty ? (
        <div className='empty-cart'>
          <h2>Your Cart is Empty</h2>
          <button className='go-home' onClick={() => navigate('/')}>
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <div className='cart-items'>
            <div className='cart-items-title'>
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className='cart-items-title cart-items-item'>
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <div className='cart-qty' aria-label={`Quantity for ${item.name}`}>
                        <button
                          type='button'
                          className='cart-qty-btn'
                          onClick={() => removeFromCart(item._id)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>
                        <p className='cart-qty-value' aria-label='Quantity'>
                          {cartItems[item._id]}
                        </p>
                        <button
                          type='button'
                          className='cart-qty-btn'
                          onClick={() => addToCart(item._id)}
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <p>₹{item.price * cartItems[item._id]}</p>
                      <p
                        onClick={() => deleteFromCart(item._id)}
                        className='cross'
                        role='button'
                        tabIndex={0}
                        aria-label={`Remove ${item.name} from cart`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            deleteFromCart(item._id);
                          }
                        }}
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart Totals</h2>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <div className='cart-total-details'>
                <p>Delivery Charges</p>
                <p>₹50</p>
              </div>
              <div className='cart-total-details cart-total-final'>
                <p>Total</p>
                <p>₹{getTotalCartAmount() + 50}</p>
              </div>
              <hr />
            </div>
          </div>
          <button className='cart-checkout' onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
