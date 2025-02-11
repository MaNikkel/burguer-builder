import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order!</h3>
      <p>Um lanche top</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continuar para o pagamento?</p>
      <Button btnType="Danger" clicked={props.cancelButton}>
        CANCELAR
      </Button>
      <Button btnType="Success" clicked={props.continueButton}>
        CONTINUAR
      </Button>
    </Aux>
  );
};
export default orderSummary;
