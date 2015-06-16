import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';

class UserActions {
  restoreCurrentUser() {
    return Promise.bind(this).then(function() {
      const user = Parse.User.current();
      if (!!user) this.dispatch(user);
    });
  }

  logInUser(username, password) {
    return Promise.bind(this).then(function() {
      return Parse.User.logIn(username, password);

    }).then(function(user) {
      this.dispatch(user);

    });
  }

  logOutUser() {
    return Promise.bind(this).then(function() {
      return Parse.User.logOut();

    }).then(function() {
      // Clear all stores
      alt.recycle();

      this.dispatch();

    });
  }

  signUpUser(attrs) {
    return Promise.bind(this).then(function() {
      let user = new Parse.User;
      user.set(attrs);
      return user.signUp();

    }).then(function(user) {
      this.dispatch(user);

    });
  }

  updateUser(user, data) {
    return Promise.bind(this).then(function() {
      for (let key in data) {
        user.set(key, data[key]);
      }

      return user.save();

    }).then(function(user) {
      this.dispatch(user);

    });
  }
}

export default alt.createActions(UserActions);
