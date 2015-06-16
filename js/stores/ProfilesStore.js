import alt from 'flux/alt';
import ProfilesActions from 'actions/ProfilesActions';

class ProfilesStore {
  constructor() {
    this.bindListeners({
      setObjects: ProfilesActions.FETCH_ALL_FOR_CURRENT_USER
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


  // MARK: Public methods
  static forOrganizationWithId(id) {
    const objects = this.getState().objects;
    for (let key in objects) {
      let object = objects[key];
      if (object.get("organization").id == id) return object;
    }
  }
}

export default alt.createStore(ProfilesStore, 'ProfilesStore');
