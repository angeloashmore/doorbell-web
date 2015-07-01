import alt from 'flux/alt';
import Parse from 'lib/Parse';

import NotificationsActions from 'actions/NotificationsActions';
import { UserNotLoggedIn } from 'errors';
import TeamsActions from 'actions/TeamsActions';
import BillingsActions from 'actions/BillingsActions';
import PlansActions from 'actions/PlansActions';
import ProfilesActions from 'actions/ProfilesActions';

class UserActions {
  restoreCurrent() {
    const promise = Promise.resolve().then(() => {
      const user = Parse.User.current();

      if (!!user) {
        this.dispatch(user);
        TeamsActions.fetchAllForCurrentUser();
        BillingsActions.fetchAllForCurrentUser();
        PlansActions.fetchAll();
        ProfilesActions.fetchAllForCurrentUser();
      } else {
        throw new UserNotLoggedIn();
      }

    });

    return promise;
  }

  signIn(email, password) {
    return Promise.resolve().then(() => {
      return Parse.User.logIn(email, password);

    }).then((user) => {
      this.dispatch(user);
      TeamsActions.fetchAllForCurrentUser();
      BillingsActions.fetchAllForCurrentUser();
      PlansActions.fetchAll();
      ProfilesActions.fetchAllForCurrentUser();

    });
  }

  signOut() {
    return Promise.resolve().then(() => {
      return Parse.User.logOut();

    }).then(() => {
      // Clear all stores.
      alt.recycle();

      NotificationsActions.create({ message: "You have been successfully signed out." });

      this.dispatch();

    });
  }

  signUp(attrs) {
    return Promise.resolve().then(() => {
      attrs.username = attrs.email;

      const user = new Parse.User;
      user.set(attrs);
      return user.signUp();

    }).then((user) => {
      this.dispatch(user);

    });
  }

  resetPassword(email) {
    return Promise.resolve().then(() => {
      return Parse.User.requestPasswordReset(email);

    }).then((result) => {
      return this.actions.signOut();

    });
  }

  update(user, data) {
    return Promise.resolve().then(() => {
      for (let key in data) {
        user.set(key, data[key]);
      }

      return user.save();

    }).then((user) => {
      this.dispatch(user);

    });
  }
}

export default alt.createActions(UserActions);
