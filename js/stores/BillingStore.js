import alt from 'flux/alt';
import BillingActions from 'actions/BillingActions';

class BillingStore {
  constructor() {
    this.bindListeners({
      setObjects: BillingActions.FETCH_ALL_WITHIN_ACL
    });

    this.state = {
      objects: []
    };
  }

  // MARK: Store methods
  setObjects(objects) {
    this.setState({ objects: objects });
  }

  // MARK: Private methods
  _objectsWithType(type) {
    const objects = this.getState().objects;
    return this.getState().objects.filter(function(object) {
      const relation = object.get("relation");
      relation.className == type;
    });
  }

  // MARK: Public methods
  static forCurrentUser() {
    return this._objectsWithType("user")[0];
  }

  static forOrganizationWithId(id) {
    const objects = this._objectsWithType("organization");
    return objects.find(function(object, index, array) {
      return object.relation.objectId == id
    });
  }
}

export default alt.createStore(BillingStore, 'BillingStore');
