import 'whatwg-fetch';
import alt from 'flux/alt';
import { r } from 'lib/RethinkDB';
import { UserStore } from 'stores';
import { TeamMembersActions } from 'actions';
import { UserNotLoggedIn } from 'errors';
import RethinkDB from 'lib/RethinkDB';

class TeamsActions {
  fetchAllForCurrentUser() {
    const { user } = UserStore.getState();

    const query = r.table('teams').filter(team => team('users').contains(user.user_id));

    RethinkDB.runQuery(query)
      .then(cursor => cursor.toArray())
      .then(result => this.dispatch(result));

    RethinkDB.runQuery(query.changes({ includeStates: true }))
      .then(cursor => {
        let feedStateReady = false;
        cursor.each((error, row) => {
          if (error) throw error;
          if (row.state) {
            feedStateReady = row.state === 'ready';
          } else if (feedStateReady) {
            console.log(row);
            this.dispatch(row.new_val)
          }
        });
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
