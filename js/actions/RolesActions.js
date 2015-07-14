import alt from 'flux/alt';
import { UserNotLoggedIn } from 'errors';
import UserStore from 'stores/UserStore';

class RolesActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return fetch("http://localhost:5000/api/v1/roles", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.roles);

    });
  }

  update(id, attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/roles/${id}`, {
        method: "put",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });

    }).then((response) => {
      return response.json();

    }).then((role) => {
      this.dispatch(role);

    });
  }
}

export default alt.createActions(RolesActions);
