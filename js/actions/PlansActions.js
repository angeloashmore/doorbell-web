import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';

class PlansActions {
  fetchAll() {
    return Promise.bind(this).then(function() {
      const query = new Parse.Query("Plan");
      return query.find();

    }).then(function(results) {
      this.dispatch(results);

    });
  }
}

export default alt.createActions(PlansActions);
