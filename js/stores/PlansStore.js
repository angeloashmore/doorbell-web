import alt from 'flux/alt';
import PlansActions from 'actions/PlansActions';

class PlansStore {
  constructor() {
    this.bindListeners({
      setPlans: PlansActions.FETCH_ALL
    });

    this.plans = {}
  }


  // MARK: Store methods
  setPlans(plans) {
    for (let plan of plans) {
      this.setPlan(plan);
    }
  }

  setPlan(plan) {
    this.plans[plan.id] = plan;
  }

  destroyPlan(plan) {
    delete this.plans[plan.id];
  }


  // MARK: Private methods
  _plansWithType(type) {
    const filteredPlans = {};

    for (let key in this.plans) {
      let plan = plans[key];
      if (plan.get("type") == type) filteredPlans[plan.id] = plan;
    }

    return filteredPlans;
  }


  // MARK: Public methods
  static forUsers() {
    return this._plansWithType("user");
  }

  static forOrganizations() {
    return this._plansWithType("organization");
  }
}

export default alt.createStore(PlansStore, 'PlansStore');
