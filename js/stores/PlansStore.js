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
}

export default alt.createStore(PlansStore, 'PlansStore');
