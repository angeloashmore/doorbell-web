import alt from 'flux/alt';
import ProfilesActions from 'actions/ProfilesActions';

class ProfilesStore {
  constructor() {
    this.bindListeners({
      setProfiles: ProfilesActions.FETCH_ALL_FOR_CURRENT_USER
    });

    this.profiles = {};
  }


  // MARK: Store methods
  setProfiles(profiles) {
    for (let profile of profiles) {
      this.setProfile(profile);
    }
  }

  setProfile(profile) {
    this.profiles[profile.id] = profile;
  }

  destroyProfile(profile) {
    delete this.profiles[profile.id];
  }

  // MARK: Private methods


  // MARK: Public methods
  static forOrganizationWithId(id) {
    const { profiles } = this.getState();
    for (let key in profiles) {
      let profile = profiles[key];
      if (profile.get("organization").id == id) return profile;
    }
  }
}

export default alt.createStore(ProfilesStore, 'ProfilesStore');
