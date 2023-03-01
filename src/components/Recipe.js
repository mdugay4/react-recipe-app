import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, image, calories, ingredients }) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                ))}
            </ol>
            <p>Calories: {Math.round(calories)}</p>
            <img className={style.image} src={image} alt="Picture of food" />
        </div>
    );
};

export default Recipe;
