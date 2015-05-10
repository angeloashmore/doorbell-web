import React from 'react';
import { Link } from 'react-router';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';
import UserStore from '../stores/UserStore';

export default AuthenticatedComponent(
  class extends React.Component {
    render() {
      return(
        <div>
          <p>Plans page</p>
          {UserStore.hasCard() ? (
            <p>Has card, show options</p>
          ) : (
            <p>
              No card, please add one before subscribing.<br />
              <Link to="billing">Billing</Link>
            </p>
          )}
        </div>
      );
    }
  }
);
