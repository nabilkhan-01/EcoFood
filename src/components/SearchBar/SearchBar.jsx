import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search food…' }) => {
  return (
    <div className='search-bar'>
      <input
        className='search-bar-input'
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label='Search food items by name'
      />
    </div>
  );
};

export default SearchBar;
