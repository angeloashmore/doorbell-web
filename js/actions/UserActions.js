import alt from '../flux/alt';
import Parse from '../stores/Parse';

class UserActions {
  restoreCurrentUser() {
    if (!!Parse.User.current()) {
      this.dispatch(Parse.User.current());
    }
  }

  logInUser(username, password) {
    return Parse.User.logIn(username, password)
      .then((user) => this.dispatch(user));
  }

  logOutUser() {
    return Parse.User.logOut()
      .then(() => this.dispatch())
  }

  signUpUser(attrs) {
    return Parse.Cloud.run('User__create', attrs)
      .then((user) => this.dispatch(user))
      .then(() => Parse.User.logIn(attrs.username, attrs.password));
  }

  updateUser(user, data) {
    for (let key in data) {
      user.set(key, data[key]);
    }

    return user.save()
      .then((user) => this.dispatch(user));
  }

  addCardToken(token) {
    return Parse.Cloud.run('User__addCardToken', { token: token })
      .then((user) => this.dispatch(user))
      .then(() => Parse.User.current().fetch());
  }
}

export default alt.createActions(UserActions);
