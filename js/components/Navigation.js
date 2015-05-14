import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

@connectToStores
export default class Navigation extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores(props) {
    return UserStore.getState();
  }

  logOutUser() {
    var { router } = this.context;

    UserActions.logOutUser()
      .then(() => router.transitionTo('login'))
      .catch((error) => console.log(error));
  }

  renderLoggedIn() {
    return (
      <ul>
        <li><Link to="app">Home</Link></li>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="profile">Profile</Link></li>
        <li><Link to="billing">Billing</Link></li>
        <li><Link to="plans">Plans</Link></li>
        <li>Logged in as: {this.props.user.get("name")} ({this.props.user.get("username")})</li>
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
