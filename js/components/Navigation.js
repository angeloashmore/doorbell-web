import React from 'react';
import { Link } from 'react-router';

import AuthenticationActions from '../actions/AuthenticationActions';

export default class Navigation extends React.Component {
  logOutUser() {
    var { router } = this.context;

    AuthenticationActions.logOutUser();
    router.transitionTo('login');
  }

  renderLoggedIn() {
    return (
      <ul>
        <li><Link to="app">Home</Link></li>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li>Logged in as: {this.props.user.attributes.username}</li>
        <li><a onClick={() => this.logOutUser()}>Log Out</a></li>
      </ul>
    );
  }

  renderLoggedOut() {
    return (
      <ul>
        <li><Link to="app">Home</Link></li>
        <li><Link to="login">Log In</Link></li>
        <li><Link to="signup">Sign Up</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <div className="navigation">
        {!!this.props.user ? this.renderLoggedIn() : this.renderLoggedOut()}
      </div>
    );
  }
}

Navigation.contextTypes = {
  router: React.PropTypes.func
};
