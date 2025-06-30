import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Search.css';

const Search = ({ onSearch, query = '' }) => {
  const [input, setInput] = useState(query);
  const navigate = useNavigate();


  useEffect(() => {
    setInput(query);
  }, [query]);

  const handleSearch = () => {
    if (onSearch) {

      onSearch(input);
    } else {

      if (input.trim()) {
        navigate(`/products?search=${encodeURIComponent(input.trim())}`);
      }
    }
  };

  return (
    <div className="search-container">
      <div className="categories">
        <Link to="/men"><button>Mens</button></Link>
        <Link to="/women"><button>Womens</button></Link>
        <Link to="/kids"><button>Kids</button></Link>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
