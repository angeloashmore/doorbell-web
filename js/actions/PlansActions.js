import alt from 'flux/alt';
import Parse from 'lib/Parse';

class PlansActions {
  fetchAll() {
    return Promise.resolve().then(() => {
      const query = new Parse.Query("Plan");
      return query.find();

    }).then((results) => {
      this.dispatch(results);

    });
  }
}

export default alt.createActions(PlansActions);
