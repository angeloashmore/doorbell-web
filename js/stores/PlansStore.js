import alt from 'flux/alt';
import PlansActions from 'actions/PlansActions';

class PlansStore {
  constructor() {
    this.bindListeners({
      setObjects: PlansActions.FETCH_ALL
    });

    this.state = {
      objects: {}
    };
  }


  // MARK: Store methods
  setObjects(objects) {
    for (let object of objects) {
      this.setObject(object);
    }
  }

  setObject(object) {
    this.setState({ objects[object.id]: object });
    // this.setState({
    //   objects: {
    //     `${object.id}`: object
    //   }
    // });
  }


  // MARK: Private methods
  _objectsWithType(type) {
    const objects = this.getState().objects;
    const filteredObjects = {};

    for (let key in objects) {
      let object = objects[key];
      if (object.get("type") == type) filteredObjects[object.id] = object;
    }

    return filteredObjects;
  }


  // MARK: Public interface
  static forUsers() {
    return this._objectsWithType("user");
  }

  static forOrganizations() {
    return this._objectsWithType("organization");
  }
}

export default alt.createStore(PlansStore, 'PlansStore');
