import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurguerBuilder/BurguerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurguerBuilder} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onAuthCheckState: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
