import alt from 'flux/alt';
import jwt_decode from 'jwt-decode';
import NotificationsActions from 'actions/NotificationsActions';
import UserActions from 'actions/UserActions';

class UserStore {
  constructor() {
    this.bindListeners({
      setJWT: [
        UserActions.SIGN_IN,
        UserActions.SIGN_UP
      ],
      clearAllStores: UserActions.SIGN_OUT
    });

    this.jwt = null;
    this.user = null;
  }

  // MARK: Store methods
  setJWT(jwt) {
    localStorage.setItem("jwt", jwt);

    this.jwt = jwt;
    this.user = jwt_decode(jwt);
  }

  clearAllStores(showNotification) {
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
