import React from 'react';
import AltContainer from 'alt/AltContainer';

import UserStore from 'stores/UserStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {
    willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the
      // user is not logged in, we'll send him or her to the Log In page.
      if (!UserStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }

    render() {
      return (
        <ComposedComponent />
      );
    }
  }
}
