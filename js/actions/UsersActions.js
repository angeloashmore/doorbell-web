import alt from 'flux/alt';
import { UserNotLoggedIn } from 'errors';
import { UserStore } from 'stores';

class UsersActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return fetch("http://localhost:5000/api/v1/users", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.users);

    });
  }

  fetchWithId(id) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/users/${id}`, {
        method: "get",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      });

    }).then((response) => {
      return response.json();

    }).then((user) => {
      this.dispatch(user);

    });
  }
}

export default alt.createActions(UsersActions);
