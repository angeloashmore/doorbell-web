import alt from 'flux/alt';
import Actions from 'actions';

class UsersStore {
  constructor() {
    this.bindListeners({
      setUsers: Actions.Users.FETCH_ALL_FOR_CURRENT_USER,
      setUser: Actions.Users.FETCH_WITH_ID
    });

    this.users = new Map();
  }


  // MARK: Store methods
  setUsers(users) {
    for (let user of users) {
      this.setUser(user);
    }
  }

  setUser(user) {
    this.users.set(user.id, user);
  }

  deleteUser(user) {
    this.users.delete(user.id);
  }

  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, users = this.getState().users) {
    return new Map([...users].filter((entry) => block(entry[1])));
  }

  static withId(id) {
    return this.getState().users.get(id);
  }
}

export default alt.createStore(UsersStore, 'UsersStore');
