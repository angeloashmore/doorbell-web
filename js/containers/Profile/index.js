import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import authenticatedComponent from 'decorators/authenticatedComponent';
import UserStore from 'stores/UserStore';

@authenticatedComponent
@connectToStores
export default class extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  render() {
    return (
      <div>
        <dl>
          <dt>First Name</dt>
          <dd>{this.props.user.get("firstName")}</dd>
          <dt>Last Name</dt>
          <dd>{this.props.user.get("lastName")}</dd>
          <dt>Email</dt>
          <dd>{this.props.user.get("email")}</dd>
        </dl>
        <Link to="profile__edit">Edit Account</Link>
      </div>
    );
  }
}
