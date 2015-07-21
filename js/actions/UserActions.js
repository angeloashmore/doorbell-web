import alt from 'flux/alt';
import Auth0 from 'lib/Auth0';

import { UserNotLoggedIn } from 'errors';
import Stores from 'stores';
import NotificationsActions from 'actions/NotificationsActions';
import TeamsActions from 'actions/TeamsActions';
import BillingsActions from 'actions/BillingsActions';
import PlansActions from 'actions/PlansActions';
import ProfilesActions from 'actions/ProfilesActions';
import UsersActions from 'actions/UsersActions';

class UserActions {
  restore() {
    const jwt = localStorage.getItem("jwt");

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return Auth0.getProfilePromise(jwt);

    }).then((user) => {
      const results = { jwt: jwt, user: user };
      this.dispatch(results);

    }).then(() => {
      this.actions._populateOtherStores();

    });
  }

  signIn(email, password) {
    return Promise.resolve().then(() => {
      return Auth0.signInPromise({
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        sso: false
      });

    }).then((results) => {
      this.dispatch(results);

    }).then(() => {
      this.actions._populateOtherStores();

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
      return Auth0.signUpPromise({
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        name: name,
        sso: false
      });

    }).then((results) => {
      this.dispatch(results);

    });
  }

  resetPassword(email, password) {
    return Promise.resolve().then(() => {
      return Auth0.changePasswordPromise({
        connection: "Username-Password-Authentication",
        email: email,
        password: password
      });

    }).then((results) => {
      this.dispatch(results);

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

  _populateOtherStores() {
    if (Stores.User.isLoggedIn()) {
      TeamsActions.fetchAllForCurrentUser();
      BillingsActions.fetchAllForCurrentUser();
      PlansActions.fetchAll();
      UsersActions.fetchAllForCurrentUser();
      ProfilesActions.fetchAllForCurrentUser();
    }
  }
}

export default alt.createActions(UserActions);
