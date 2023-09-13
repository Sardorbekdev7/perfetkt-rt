import './style/style.css';
import search from '../../assets/search/search.svg';
import filter from '../../assets/search/filter.svg';
import { useState } from 'react';

const Search = ({ setFilter }) => {

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(!open);
    setFilter(open);
  };

  return (
    <div className='search'>
        <input type="text" placeholder='Kitob nomini yozing...' />
        <div className='search-filter'>
            <img onClick={() => handleClickOpen()} src={filter} alt="" />
            <img src={search} alt="" />
        </div>
    </div>
  )
}

export default Search