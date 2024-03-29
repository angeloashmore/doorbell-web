import 'whatwg-fetch';
import alt from 'flux/alt';
import { UserStore } from 'stores';
import { TeamMembersActions } from 'actions';
import { UserNotLoggedIn } from 'errors';

class TeamsActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

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

    }).then(() => {
      return TeamMembersActions.fetchAllForCurrentUser();

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
