import 'whatwg-fetch';
import alt from 'flux/alt';
import Parse from 'lib/Parse';
import UserStore from 'stores/UserStore';

class TeamsActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();
    if (!jwt) throw new UserNotLoggedIn();

    return Promise.resolve().then(() => {
      return fetch("http://localhost:5000/api/v1/teams", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.teams);

    });
  }

  create(attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch("http://localhost:5000/api/v1/teams", {
        method: "post",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: attrs.name,
          email: attrs.email
        })
      });

    }).then((response) => {
      return response.json();

    }).then((team) => {
      this.dispatch(team);

    });
  }

  update(id, attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/teams/${id}`, {
        method: "put",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: attrs.name,
          email: attrs.email
        })
      });

    }).then((response) => {
      return response.json();

    }).then((team) => {
      this.dispatch(team);

    });
  }

  destroy(id) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/teams/${id}`, {
        method: "delete",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      });

    }).then((response) => {
      return response.json();

    }).then((team) => {
      this.dispatch(team);

    });
  }
}

export default alt.createActions(TeamsActions);
