import alt from 'flux/alt';
import jwt_decode from 'jwt-decode';
import { UserActions } from 'actions';

class UserStore {
  constructor() {
    this.bindListeners({
      setJWTAndUser: [
        UserActions.RESTORE,
        UserActions.SIGN_IN,
        UserActions.SIGN_UP
      ],
      clearAllStores: [
        UserActions.SIGN_OUT,
        UserActions.RESET_PASSWORD
      ]
    });

    this.jwt = null;
    this.user = null;
  }

  // MARK: Store methods
  setJWTAndUser(params) {
    const { jwt, user } = params;

    this.setJWT(jwt);
    this.setUser(user);
  }

  setJWT(jwt) {
    localStorage.setItem("jwt", jwt);
    this.jwt = jwt;
  }

  setUser(user) {
    this.user = user;
  }

  clearAllStores() {
    localStorage.clear();
    alt.recycle();
  }


  // MARK: Private methods


  // MARK: Public methods
  static isLoggedIn() {
    const { jwt, user } = this.getState();
    return !!jwt && !!user;
  }
}

export default alt.createStore(UserStore, 'UserStore');
