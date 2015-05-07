import alt from '../flux/alt';
import Parse from '../stores/Parse';

class AuthenticationActions {
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

  signUpUser(username, password, attrs) {
    return Parse.User.signUp(username, password, attrs)
      .then((user) => this.dispatch(user))
  }
}

export default alt.createActions(AuthenticationActions);
