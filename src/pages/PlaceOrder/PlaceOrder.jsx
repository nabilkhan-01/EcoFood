import { useContext, useMemo, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, getTotalCartAmount, clearCart, pushToast } = useContext(StoreContext);

  const isCartEmpty = Object.keys(cartItems).length === 0;
  const itemsCount = useMemo(
    () => Object.values(cartItems).reduce((sum, qty) => sum + (qty || 0), 0),
    [cartItems]
  );

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isCartEmpty) {
      navigate('/cart');
      return;
    }
    clearCart();
    pushToast('Order placed successfully', 'success');
    navigate('/');
  };

  return (
    <div className='place-order'>
      <h1>Place Order</h1>

      {isCartEmpty ? (
        <div className='place-order-empty'>
          <p>Your cart is empty. Add items before placing an order.</p>
          <button type='button' className='place-order-primary' onClick={() => navigate('/')}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className='place-order-grid'>
          <form className='place-order-form' onSubmit={onSubmit}>
            <h2>Delivery Details</h2>

            <label>
              Full name
              <input name='fullName' value={form.fullName} onChange={onChange} required autoComplete='name' />
            </label>
            <label>
              Phone
              <input name='phone' value={form.phone} onChange={onChange} required inputMode='tel' autoComplete='tel' />
            </label>
            <label>
              Address
              <input name='address' value={form.address} onChange={onChange} required autoComplete='street-address' />
            </label>

            <div className='place-order-row'>
              <label>
                City
                <input name='city' value={form.city} onChange={onChange} required autoComplete='address-level2' />
              </label>
              <label>
                ZIP
                <input name='zip' value={form.zip} onChange={onChange} required inputMode='numeric' autoComplete='postal-code' />
              </label>
            </div>

            <button type='submit' className='place-order-primary'>
              Confirm Order
            </button>
          </form>

          <div className='place-order-summary'>
            <h2>Order Summary</h2>
            <div className='place-order-summary-row'>
              <p>Items</p>
              <p>{itemsCount}</p>
            </div>
            <div className='place-order-summary-row'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className='place-order-summary-row'>
              <p>Delivery</p>
              <p>₹50</p>
            </div>
            <div className='place-order-summary-row place-order-total'>
              <p>Total</p>
              <p>₹{getTotalCartAmount() + 50}</p>
            </div>

            <hr />
            <div className='place-order-items'>
              {food_list
                .filter((item) => cartItems[item._id] > 0)
                .map((item) => (
                  <div key={item._id} className='place-order-item'>
                    <p className='place-order-item-name'>{item.name}</p>
                    <p className='place-order-item-qty'>x{cartItems[item._id]}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaceOrder