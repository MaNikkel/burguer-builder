import React, { Component } from "react";
import { connect } from "react-redux";
import * as burguerBuilderActions from "../../store/actions";
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
    purchaseMode: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
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
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  handleSignIn = () => {
    this.props.history.push({
      pathname: "/auth"
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

    let burger = this.props.error ? <p>ERRO</p> : <Spinner />;
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
            handleSignIn={this.handleSignIn}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
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
    ingredients: state.burguerBuilder.ingredients,
    totalPrice: state.burguerBuilder.totalPrice,
    error: state.burguerBuilder.error,
    isAuth: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(
        burguerBuilderActions.addIngredient({
          payload: { ingredientName: ingredientName }
        })
      ),
    onIngredientRemoved: ingredientName =>
      dispatch(
        burguerBuilderActions.removeIngredient({
          payload: { ingredientName: ingredientName }
        })
      ),
    onInitIngredients: () => dispatch(burguerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burguerBuilderActions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurguerBuilder, axios));
