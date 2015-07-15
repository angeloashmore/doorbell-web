import alt from 'flux/alt';
import PlansActions from 'actions/PlansActions';

class PlansStore {
  constructor() {
    this.bindListeners({
      setPlans: PlansActions.FETCH_ALL
    });

    this.plans = new Map();
  }


  // MARK: Store methods
  setPlans(plans) {
    for (let plan of plans) {
      this.setPlan(plan);
    }
  }

  setPlan(plan) {
    this.plans.set(plan.id, plan);
  }

  destroyPlan(plan) {
    this.plans.delete(plan.id);
  }


  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, plans = this.getState().plans) {
    return new Map([...plans].filter((entry) => block(entry[1])));
  }

  static withId(id) {
    return this.getState().plans.get(id);
  }

  static withType(type) {
    return this.withFilter(plan => plan.type == type);
  }

  static forUsers() {
    return this.withType("user");
  }

  static forTeam() {
    return this.withType("team");
  }
}

export default alt.createStore(PlansStore, 'PlansStore');
