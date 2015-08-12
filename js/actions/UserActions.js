import alt from 'flux/alt';
import Firebase from 'lib/Firebase';

import {
  NotificationsActions,
  TeamsActions,
  TeamMembersActions,
  BillingsActions,
  PlansActions,
  UsersActions
} from 'actions';
import { UserStore } from 'stores';
import { UserNotLoggedIn } from 'errors';

class UserActions {
  restore() {
    return Promise.resolve().then(() => {
      this.dispatch(Firebase.getAuth());
    });
  }

  signIn(email, password) {
    return new Promise((resolve, reject) => {
      const attrs = { email, password };
      Firebase.authWithPassword(attrs, (error, authData) => {
        if (error) reject(error);
        resolve(authData);
      });
    }).then(authData => {
      this.dispatch(authData);

    });
  }

  signOut(showNotification = true) {
    return Promise.resolve().then(() => {
      return Firebase.unauth();
    }).then(() => {
      this.dispatch();

    });
  }

  signUp(email, password, name) {
    return new Promise((resolve, reject) => {
      const attrs = { email, password };
      Firebase.createUser(attrs, (error, userData) => {
        if (error) reject(error);
        resolve(userData);
      });

    }).then(() => {
      this.actions.signIn(email, password);

    });
  }

  resetPassword(email) {
    return new Promise((resolve, reject) => {
      const attrs = { email };
      Firebase.resetPassword(attrs, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  // update(user, data) {
  //   return Promise.resolve().then(() => {
  //     user.set(data);
  //     return user.save();
  //
  //   }).then((user) => {
  //     this.dispatch(user);
  //
  //   });
  // }

  _populateOtherStores() {
    if (UserStore.isLoggedIn()) {
      TeamsActions.fetchAllForCurrentUser();
      TeamMembersActions.fetchAllForCurrentUser();
      BillingsActions.fetchAllForCurrentUser();
      PlansActions.fetchAll();
      UsersActions.fetchAllForCurrentUser();
    }
  }
}

export default alt.createActions(UserActions);
