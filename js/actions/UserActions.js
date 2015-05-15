import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'stores/Parse';

class UserActions {
  static eagerLoadCurrentUser() {
    return Promise.bind(this).then(function() {
      if (!Parse.User.current()) {
        throw new Promise.CancellationError("No user logged in");
      }

      let query = new Parse.Query(Parse.User);
      query.include("billing");

      return query.get(Parse.User.current().id);
    });
  }

  restoreCurrentUser() {
    return Promise.bind(this).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(user) {
      this.dispatch(user);

    }).catch(Promise.CancellationError, function(error) {
      return true;

    });
  }

  logInUser(username, password) {
    return Promise.bind(this).then(function() {
      return Parse.User.logIn(username, password);

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(user) {
      this.dispatch(user);

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

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(user) {
      this.dispatch(user);

    });
  }

  addCardToken(token) {
    return Promise.bind(this).then(function() {
      let data = { token: token };
      return Parse.Cloud.run("User__addCardToken", data);

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(user) {
      this.dispatch(user);

    });
  }

  subscribeTo(plan) {
    return Promise.bind(this).then(function() {
      let data = { planId: plan.id };
      return Parse.Cloud.run("User__subscribeTo", data);

    }).then(function() {
      return UserActions.eagerLoadCurrentUser();

    }).then(function(user) {
      this.dispatch(user);

    });
  }
}

export default alt.createActions(UserActions);
