import { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, searchQuery = '' }) => {

    const { food_list } = useContext(StoreContext);

    const isLoading = !food_list || food_list.length === 0;
    const query = searchQuery.trim().toLowerCase();

    const filteredFoods = (food_list || []).filter((item) => {
      const matchesCategory = category === 'All' || category === item.category;
      const matchesSearch = query.length === 0 || (item.name || '').toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

  return (
    <div className='food-display' id='food-display'>
      <h2>Best Local Dishes Around You</h2>

      {isLoading ? (
        <p className='food-display-state'>Loading menu…</p>
      ) : filteredFoods.length === 0 ? (
        <p className='food-display-state'>No items match your search.</p>
      ) : (
        <div className="food-display-list">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodDisplay
