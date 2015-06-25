import alt from 'flux/alt';
import Parse from 'lib/Parse';
import { UserNotLoggedIn } from 'errors';

class UserActions {
  restoreCurrentUser() {
    const promise = Promise.resolve().then(() => {
      const user = Parse.User.current();

      if (!!user) {
        this.dispatch(user);
      } else {
        throw new UserNotLoggedIn();
      }

    });

    return promise;
  }

  logInUser(username, password) {
    return Promise.resolve().then(() => {
      return Parse.User.logIn(username, password);

    }).then((user) => {
      this.dispatch(user);

    });
  }

  logOutUser() {
    return Promise.resolve().then(() => {
      return Parse.User.logOut();

    }).then(() => {
      this.dispatch();

    });
  }

  signUpUser(attrs) {
    return Promise.resolve().then(() => {
      const user = new Parse.User;
      user.set(attrs);
      return user.signUp();

    }).then((user) => {
      this.dispatch(user);

    });
  }

  updateUser(user, data) {
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
