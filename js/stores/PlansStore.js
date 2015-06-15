import alt from 'flux/alt';
import PlansActions from 'actions/PlansActions';

class PlansStore {
  constructor() {
    this.bindListeners({
      replaceObjects: PlansActions.FETCH_ALL
    });

    this.state = {
      objects: []
    };
  }


  // MARK: Store methods
  replaceObjects(objects) {
    this.setState({ objects: objects });
  }


  // MARK: Private methods
  _objectsForType(type) {
    return this.getState().objects.filter(function(object) {
      return object.get("type") == type;
    });
  }


  // MARK: Public interface
  static forUsers() {
    return this._objectsForType("user");
  }

  static forOrganizations() {
    return this._objectsForType("organization");
  }
}

export default alt.createStore(PlansStore, 'PlansStore');
