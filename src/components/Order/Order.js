import React from "react";

import classes from "./Order.module.css";

export default function Order(props) {
  console.log(props.ingredients);
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      amount: props.ingredients[ingredientName],
      name: ingredientName
    });
  }
  const ingredientsOutput = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>R$ {parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}
