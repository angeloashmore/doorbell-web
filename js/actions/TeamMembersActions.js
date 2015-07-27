import alt from 'flux/alt';
import { UserNotLoggedIn } from 'errors';
import { UsersActions } from 'actions';
import { UserStore } from 'stores';

class TeamMembersActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return fetch("http://localhost:5000/api/v1/team_members", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.team_members);

    });
  }

  create(attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch("http://localhost:5000/api/v1/team_members", {
        method: "post",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          team_id: attrs.team_id,
          email: attrs.email
        })
      });

    }).then((response) => {
      return response.json();

    }).then((team_member) => {
      this.dispatch(team_member);

    }).then(() => {
      return UsersActions.fetchAllForCurrentUser();

    });
  }

  update(id, attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/team_members/${id}`, {
        method: "put",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: attrs.title,
          email: attrs.email
        })
      });

    }).then((response) => {
      return response.json();

    }).then((team_member) => {
      this.dispatch(team_member);

    });
  }

  destroy(id, attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/team_members/${id}`, {
        method: "delete",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      });

    }).then((response) => {
      return response.json();

    }).then((team_member) => {
      this.dispatch(team_member);

    });
  }
}

export default alt.createActions(TeamMembersActions);
