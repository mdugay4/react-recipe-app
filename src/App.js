import './App.css';
import React, { useEffect, useState } from 'react';
import Recipe from './components/Recipe';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    // no second parameter means useEffect() will be called everytime an effect takes place
    // second parameter [] allows for one call upon first render instead of everytime an effect takes place
    // can also specify what change to pay attention to for running useEffect(). Example [variable] as parameter.
    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    const getSearch = (e) => {
        console.log(e.target);
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };

    return (
        <div className='App'>
            <form onSubmit={getSearch} className='search-form'>
                <input
                    className='search-bar'
                    type='text'
                    value={search}
                    onChange={updateSearch}
                />
                <button className='search-button' type='submit'>
                    Search
                </button>
            </form>
            <div className='recipes'>
                {recipes.map((recipe, index) => (
                    <Recipe
                        key={index}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
