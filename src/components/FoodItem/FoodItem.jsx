import { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image,rating}) => {

    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);

    const onIconKeyDown = (event, action) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
      }
    };

    const safeRating = Number.isFinite(Number(rating)) ? Math.max(0, Math.min(5, Number(rating))) : 0;
    const ratingPercent = (safeRating / 5) * 100;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt={name} loading="lazy" />
        {!cartItems[id]
            ?<img
                className='add'
                src={assets.add_icon_white}
                alt={`Add ${name} to cart`}
                role='button'
                tabIndex={0}
                onClick={() => addToCart(id)}
                onKeyDown={(e) => onIconKeyDown(e, () => addToCart(id))}
              />
            :<div className='food-item-counter'>
                <img
                  src={assets.remove_icon_red}
                  alt={`Remove one ${name}`}
                  role='button'
                  tabIndex={0}
                  onClick={() => removeFromCart(id)}
                  onKeyDown={(e) => onIconKeyDown(e, () => removeFromCart(id))}
                />
                <p>{cartItems[id]}</p>
                <img
                  src={assets.add_icon_green}
                  alt={`Add one ${name}`}
                  role='button'
                  tabIndex={0}
                  onClick={() => addToCart(id)}
                  onKeyDown={(e) => onIconKeyDown(e, () => addToCart(id))}
                />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <div className="food-item-rating">
              <div className="food-item-stars" aria-hidden="true">
                <div className="food-item-stars-base">★★★★★</div>
                <div className="food-item-stars-fill" style={{ width: `${ratingPercent}%` }}>★★★★★</div>
              </div>
              <span aria-label={`Rated ${safeRating.toFixed(1)} out of 5`}>{safeRating.toFixed(1)}</span>
            </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
