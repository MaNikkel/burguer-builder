import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

class BurguerBuilder extends Component {
  state = {
    purchaseMode: false,
    loading: false,
    errorState: false
  };

  componentDidMount() {
    // axios
    //   .get("https://react-my-burger-4094a.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //     Object.keys(response.data).map(igKey => {
    //       if (response.data[igKey]) {
    //         this.setState({ purchasable: true });
    //       }
    //       return true;
    //     });
    //   })
    //   .catch(err => this.setState({ errorState: true }));
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  handlePurchase = () => {
    this.setState({ purchaseMode: !this.state.purchaseMode });
  };

  handleContinue = () => {
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.errorState ? <p>ERRO</p> : <Spinner />;
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelButton={this.handlePurchase}
          continueButton={this.handleContinue}
          totalPrice={this.props.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burguer ingredients={this.props.ingredients} />
          <BuildControls
            totalPrice={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasable={!this.updatePurchaseState(this.props.ingredients)}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName: ingredientName }
      }),
    onIngredientRemoved: ingredientName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName: ingredientName }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurguerBuilder, axios));
