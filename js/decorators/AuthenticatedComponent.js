import React from 'react';
import NotificationsActions from 'actions/NotificationsActions';
import UserStore from 'stores/UserStore';

export default function authenticatedComponent(Component) {
  return class extends React.Component {
    static willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the
      // user is not logged in, we'll send him or her to the Log In page.
      if (!UserStore.isLoggedIn()) {
        transition.redirect('/signIn');
        NotificationsActions.create({ message: "Oops… looks like you need to sign in first." });
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
}
