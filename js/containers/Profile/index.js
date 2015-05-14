import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import AuthenticatedComponent from 'decorators/AuthenticatedComponent';
import UserStore from 'stores/UserStore';

export default AuthenticatedComponent(
  @connectToStores
  class extends React.Component {
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
            <dt>Name</dt>
            <dd>{this.props.user.get("name")}</dd>
            <dt>Email</dt>
            <dd>{this.props.user.get("email")}</dd>
          </dl>
          <Link to="profile__edit">Edit Account</Link>
        </div>
      );
    }
  }
);
