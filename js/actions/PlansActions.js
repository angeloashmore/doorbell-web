import alt from 'flux/alt';
import { UserStore } from 'stores';

class PlansActions {
  fetchAll() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return fetch("http://localhost:5000/api/v1/plans", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.plans);

    });
  }
}

export default alt.createActions(PlansActions);
