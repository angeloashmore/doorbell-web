import React from 'react';
import UserStore from 'stores/UserStore';

export default function authenticatedComponent(Component) {
  return class AuthenticatedComponent extends React.Component {
    static willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the
      // user is not logged in, we'll send him or her to the Log In page.
      if (!UserStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }

    render() {
      return React.createElement(Component);
    }
  }
}
