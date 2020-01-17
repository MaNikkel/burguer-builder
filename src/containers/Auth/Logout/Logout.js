import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../../../store/actions";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    let willRedirect = <Spinner />;
    if (!this.props.token) {
      willRedirect = <Redirect to="/" />;
    }
    return <div>{willRedirect}</div>;
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
