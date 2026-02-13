import { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import SearchBar from '../../components/SearchBar/SearchBar';


const Home = () => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
    return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <div className='home-search'>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <FoodDisplay category={category} searchQuery={searchQuery} />
      
    </div>
  )
}

export default Home
