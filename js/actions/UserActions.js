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

  generateJWT(email, password) {
    return new Promise((resolve, reject) => {
      Auth0.signin({
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        sso: false
      }, (error, _user, jwt) => {
        error ? reject(error) : resolve(jwt);
      });
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
    return new Promise((resolve, reject) => {
      Auth0.signup({
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        name: name,
        sso: false
      }, (error, _user, jwt) => {
        error ? reject(error) : resolve(jwt);
      });

    }).then((jwt) => {
      this.dispatch(jwt);

    });
  }

  resetPassword(email, password) {
    return new Promise((resolve, reject) => {
      Auth0.changePassword({
        connection: "Username-Password-Authentication",
        email: email,
        password: password
      }, (error, response) => {
        error ? reject(error) : resolve(response);
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
