import React from "react";

import classes from "./burguer.module.css";
import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";

const burguer = props => {
  // pega os identificadores e coloca em um array
  let transformedIngredients = Object.keys(props.ingredients)
    // mapeia esse array com os identificadores
    .map(ingredient => {
      // rotorna um novo com as quantidades, por exemplo: {salad: 2} => [ , ]
      return (
        [...Array(props.ingredients[ingredient])]
          // refatora as posições para um ingrediente
          .map((_, index) => (
            <BurguerIngredient key={ingredient + index} type={ingredient} />
          ))
      );
    })
    //coloca todos os arrays em um só
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  // caso esteja zerado
  if (!transformedIngredients.length) {
    transformedIngredients = <p>Por favor, coloque ingredientes!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurguerIngredient type="bread-top" />
      {transformedIngredients}
      <BurguerIngredient type="bread-bottom" />
    </div>
  );
};

export default burguer;
