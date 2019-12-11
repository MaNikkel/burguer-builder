import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => {
  const controlsMap = controls.map(control => (
    <BuildControl
      label={control.label}
      key={control.label}
      added={() => props.ingredientAdded(control.type)}
      removed={() => props.ingredientRemoved(control.type)}
      disabled={props.disabled[control.type]}
    />
  ));
  return (
    <div className={classes.BuildControls}>
      <p>
        Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controlsMap}
      <button
        className={classes.OrderButton}
        disabled={props.purchasable}
        onClick={props.handlePurchase}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
