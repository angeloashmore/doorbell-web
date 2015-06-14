import alt from 'flux/alt';
import PlansActions from 'actions/PlansActions';

class PlansStore {
  constructor() {
    this.bindListeners({
      replacePlans: PlansActions.FETCH_ALL
    });

    this.state = {
      plans: []
    };
  }

  replacePlans(plans) {
    this.setState({ plans: plans });
  }

  _plansForType(type) {
    return this.getState().plans.filter(function(plan) {
      return plan.get("type") == type;
    });
  }

  // MARK: Public interface
  static plansForUsers() {
    return this._plansForType("user");
  }

  static plansForOrganizations() {
    return this._plansForType("organization");
  }
}

export default alt.createStore(PlansStore, 'PlansStore');
