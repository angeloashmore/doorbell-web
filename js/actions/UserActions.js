import Promise from 'bluebird';

import alt from '../flux/alt';
import Parse from '../stores/Parse';

class UserActions {
  restoreCurrentUser() {
    return Promise.bind(this).then(function() {
      if (!!Parse.User.current()) {
        this.dispatch(Parse.User.current());
      }
    });
  }

  logInUser(username, password) {
    return Promise.bind(this).then(function() {
      return Parse.User.logIn(username, password)

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
      return Parse.Cloud.run("User__create", attrs)

    }).then(function(user) {
      user.set("password", attrs.password);
      return user.logIn()

    }).then(function(user) {
      this.dispatch(user);

    });
  }

  updateUser(user, data) {
    return Promise.bind(this).then(function() {
      for (let key of data) {
        user.set(key, data[key]);
      }

      return user.save();

    }).then(function(user) {
      this.dispatch(user);

    });
  }

  addCardToken(token) {
    return Promise.bind(this).then(function() {
      let data = { token: token };
      return Parse.Cloud.run("User__addCardToken", data)

    }).then(function(user) {
      this.dispatch(user);

    }).then(function() {
      Parse.User.current().fetch();

    });
  }
}

export default alt.createActions(UserActions);