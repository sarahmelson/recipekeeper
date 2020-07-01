import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './recipe';

const App = () => {

  const APP_ID = '987bef7f';
  const APP_KEY = '1452d4c0039446d26383c8e4a9349399';

  const [recipe, setRecipes] = useState([])
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits); 
    console.log(data.hits); 
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className ="App">
      <h1 className = "page-title">The Recipe Box</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipe">
        {recipe.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}  
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  ); 
}


export default App;
