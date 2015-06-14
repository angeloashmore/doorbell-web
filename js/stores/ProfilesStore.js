import alt from 'flux/alt';
import ProfilesActions from 'actions/ProfilesActions';

class ProfilesStore {
  constructor() {
    this.bindListeners({
      replaceProfiles: ProfilesActions.FETCH_ALL_FOR_CURRENT_USER
    });

    this.state = {
      profiles: []
    };
  }

  replaceProfiles(profiles) {
    this.setState({ profiles: profiles });
  }

  // MARK: Public interface
  static forOrganization(organization) {
    const profiles = this.getState().profiles;
    return profiles.find(function(profile, index, array) {
      return profile.get("organization") == organization;
    });
  }
}

export default alt.createStore(ProfilesStore, 'ProfilesStore');
