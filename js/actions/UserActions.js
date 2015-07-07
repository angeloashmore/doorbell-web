import alt from 'flux/alt';
import Parse from 'lib/Parse';
import Auth0 from 'lib/Auth0';

import NotificationsActions from 'actions/NotificationsActions';
import { UserNotLoggedIn } from 'errors';
import TeamsActions from 'actions/TeamsActions';
import BillingsActions from 'actions/BillingsActions';
import PlansActions from 'actions/PlansActions';
import ProfilesActions from 'actions/ProfilesActions';

class UserActions {
  restore() {
    return Promise.resolve().then(() => {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) throw new UserNotLoggedIn();

      return this.actions.signIn(jwt);
    });
  }

  signInWithCredentials(email, password) {
    return Promise.resolve().then(() => {
      return Auth0.signIn({
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        sso: false
      });

    }).then((jwt) => {
      return this.actions.signIn(jwt);

    });
  }

  signIn(jwt) {
    return Promise.resolve().then(() => {
      this.dispatch(jwt);

    });
  }

  signOut(showNotification = true) {
    return Promise.resolve().then(() => {
      this.dispatch();

      if (showNotification) {
        const message = "You have been successfully signed out.";
        NotificationsActions.create({ message: message });
      }
    });
  }

  signUp(email, password, name) {
    return Promise.resolve().then(() => {
      return Auth0.signUp({
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        name: name,
        sso: false
      });

    }).then((jwt) => {
      this.dispatch(jwt);

    });
  }

  resetPassword(email, password) {
    return Promise.resolve().then(() => {
      return Auth0.changePassword({
        connection: "Username-Password-Authentication",
        email: email,
        password: password
      });

    }).then((response) => {
      return this.actions.signOut(false);

    });
  }

  update(user, data) {
    return Promise.resolve().then(() => {
      user.set(data);
      return user.save();

    }).then((user) => {
      this.dispatch(user);

    });
  }
}

export default alt.createActions(UserActions);
