import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  cheese: 0.7,
  meat: 1.2
};

class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    purchaseMode: false,
    loading: false,
    errorState: false
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-4094a.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
        Object.keys(response.data).map(igKey => {
          if (response.data[igKey]) {
            this.setState({ purchasable: true });
          }
          return true;
        });
      })
      .catch(err => this.setState({ errorState: true }));
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  handlePurchase = () => {
    this.setState({ purchaseMode: !this.state.purchaseMode });
  };

  handleContinue = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: "Mathias Nikkel",
      adress: {
        street: "olhaaa"
      }
    };
    axios
      .post("/orders.json", order)
      .then(response => console.log(response))
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loading: false, purchaseMode: false });
      });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    if (updatedCount < 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.errorState ? <p>ERRO</p> : <Spinner />;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelButton={this.handlePurchase}
          continueButton={this.handleContinue}
          totalPrice={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burguer ingredients={this.state.ingredients} />
          <BuildControls
            totalPrice={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={!this.state.purchasable}
            disabled={disabledInfo}
            handlePurchase={this.handlePurchase}
          />
        </Aux>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchaseMode} modalClosed={this.handlePurchase}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurguerBuilder, axios);
