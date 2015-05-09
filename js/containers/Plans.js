import React from 'react';
import { Link } from 'react-router';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';
import AuthenticationStore from '../stores/AuthenticationStore';

export default AuthenticatedComponent(
  class extends React.Component {
    render() {
      return(
        <div>
          <p>Plans page</p>
          {AuthenticationStore.hasCard ? (
            <p>Has card, show options</p>
          ) : (
            <p>No card, please add one before subscribing</p>
          )}
        </div>
      );
    }
  }
);
