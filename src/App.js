import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurguerBuilder/BurguerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurguerBuilder} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
