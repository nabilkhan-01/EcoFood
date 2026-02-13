import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  const toggleCategory = (menuName) => {
    setCategory((prev) => (prev === menuName ? "All" : menuName));
  };

  const onItemKeyDown = (event, menuName) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCategory(menuName);
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Explore a vibrant menu showcasing a delightful variety of dishes. Our goal is to delight your taste buds and enhance your dining journey with every flavorful bite.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index)=>{
            return (
                <div
                  key={index}
                  className='explore-menu-list-item'
                  role='button'
                  tabIndex={0}
                  aria-pressed={category === item.menu_name}
                  onClick={() => toggleCategory(item.menu_name)}
                  onKeyDown={(e) => onItemKeyDown(e, item.menu_name)}
                >
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={`${item.menu_name} category`} />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
