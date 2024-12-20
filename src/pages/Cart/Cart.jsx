import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0;

  const handleCheckout = () => {
    clearCart(); // Clear the cart
    alert('Order Placed Successfully'); // Show success message
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className='cart'>
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
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>₹{item.price * cartItems[item._id]}</p>
                      <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
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
            </div>
            <div className='cart-total-details'>
              <p>Subtotal: <br />
              <p>₹{getTotalCartAmount()}</p></p>
              
            </div>
            <div className='cart-total-details'>
              <p>Delivery Charges <br />
              <p>₹50</p></p>
              
            </div>
            <div className='cart-total-details'>
              <p>Total <br />
              <p>₹{getTotalCartAmount() + 50}</p></p>
             
            </div>
            <hr />
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
