import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';

class UserActions {
  static eagerLoadCurrentUser() {
    const user = Parse.User.current();
    var profiles;

    if (!user) return Promise.CancellationError("No user logged in");

    return Promise.bind(this).then(function() {
      let query = new Parse.Query("Profile");
      query.equalTo("user", user);
      return query.find();

    }).then(function(_profiles) {
      profiles = _profiles;

      return {
        user: user,
        profiles: profiles
      };
    });
  }

  restoreCurrentUser() {
    return Promise.bind(this).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(userObjects) {
      this.dispatch(userObjects);

    }).catch(Promise.CancellationError, function(error) {
      return true;

    });
  }

  logInUser(username, password) {
    return Promise.bind(this).then(function() {
      return Parse.User.logIn(username, password);

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(userObjects) {
      this.dispatch(userObjects);

    });
  }

  logOutUser() {
    return Promise.bind(this).then(function() {
      return Parse.User.logOut();

    }).then(function() {
      this.dispatch();

    });
  }

  signUpUser(attrs) {
    return Promise.bind(this).then(function() {
      let user = new Parse.User;
      user.set(attrs);
      return user.signUp();

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(userObjects) {
      this.dispatch(userObjects);

    });
  }

  updateUser(user, data) {
    return Promise.bind(this).then(function() {
      for (let key in data) {
        user.set(key, data[key]);
      }

      return user.save();

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(userObjects) {
      this.dispatch(userObjects);

    });
  }
}

export default alt.createActions(UserActions);
