import React from 'react';
import AltContainer from 'alt/AltContainer';

import AuthenticationStore from '../stores/AuthenticationStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {
    static willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the
      // user is not logged in, we'll send him or her to the Log In page.
      if (!AuthenticationStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }

    render() {
      return (
        <AltContainer
          store={AuthenticationStore}
          component={ComposedComponent} />
      );
    }
  }
}
