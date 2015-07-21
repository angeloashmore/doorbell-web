import alt from 'flux/alt';
import Stores from 'stores';

class PlansActions {
  fetchAll() {
    const { jwt } = Stores.User.getState();

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
