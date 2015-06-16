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

  static contextTypes = {
    router: React.PropTypes.func
  }

  logOutUser() {
    const { router } = this.context;

    UserActions.logOutUser()
      .catch((error) => console.log(error));
  }

  renderLoggedIn() {
    return (
      <ul>
        <li><Link to="app">Home</Link></li>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="organizations">Organizations</Link></li>
        <li>Logged in as: {this.props.user.get("name")} ({this.props.user.get("username")})</li>
        <li><Link to="login" onClick={() => this.logOutUser()}>Log Out</Link></li>
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
