import alt from 'flux/alt';
import ProfilesActions from 'actions/ProfilesActions';

class ProfilesStore {
  constructor() {
    this.bindListeners({
      replaceObjects: ProfilesActions.FETCH_ALL_FOR_CURRENT_USER
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


  // MARK: Public methods
  static forOrganizationWithId(id) {
    const objects = this.getState().objects;
    return objects.find(function(object, index, array) {
      return object.get("organization").id == id;
    });
  }
}

export default alt.createStore(ProfilesStore, 'ProfilesStore');
