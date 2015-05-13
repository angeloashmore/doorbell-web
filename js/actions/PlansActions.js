import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'stores/Parse';

class PlansActions {
  fetchAll() {
    return Promise.bind(this).then(function() {
      const Plan = Parse.Object.extend("Plan");
      var query = new Parse.Query(Plan);
      return query.find()

    }).then(function(results) {
      this.dispatch(results);

    });
  }
}

export default alt.createActions(PlansActions);
