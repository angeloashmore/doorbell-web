import alt from '../flux/alt';
import Parse from '../stores/Parse';

class AuthenticationActions {
  restoreCurrentUser() {
    if (!!Parse.User.current()) {
      Parse.User.current().fetch();
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

  signUpUser(username, password, email) {
    let data = {
      username: username,
      password: password,
      email: email
    };

    return Parse.Cloud.run('User__create', data)
      .then((user) => this.dispatch(user));
  }

  addCardToken(token) {
    return Parse.Cloud.run('User__addCardToken', { token: token })
      .then((user) => this.dispatch(user))
      .then(() => Parse.User.current().fetch());
  }
}

export default alt.createActions(AuthenticationActions);
