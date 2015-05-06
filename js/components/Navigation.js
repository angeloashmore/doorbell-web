import React from 'react';
import { Link } from 'react-router';

import AuthenticationActions from '../actions/AuthenticationActions';

export default class extends React.Component {
  formattedUsername() {
    let user = this.props.user;

    if (user) {
      return user.attributes.username
    } else {
      return "Not logged in"
    }
  }

  logOutUser() {
    AuthenticationActions.logOutUser();
  }

  render() {
    return (
      <div className="navigation">
        <ul>
          <li><Link to="app">Home</Link></li>
          <li><Link to="login">Log In</Link></li>
          <li><Link to="signup">Sign Up</Link></li>
          <li><a onClick={ () => this.logOutUser() }>Log Out</a></li>
          <li>Logged in as: { this.formattedUsername() }</li>
        </ul>
      </div>
    );
  }
}
