import alt from 'flux/alt';
import { ProfilesActions } from 'actions';

class ProfilesStore {
  constructor() {
    this.bindListeners({
      setProfiles: ProfilesActions.FETCH_ALL_FOR_CURRENT_USER,
      setProfile: [
        ProfilesActions.FETCH_WITH_ID,
        ProfilesActions.UPDATE
      ]
    });

    this.profiles = new Map();
  }


  // MARK: Store methods
  setProfiles(profiles) {
    for (let profile of profiles) {
      this.setProfile(profile);
    }
  }

  setProfile(profile) {
    this.profiles.set(profile.id, profile);
  }

  deleteProfile(profile) {
    this.profiles.delete(profile.id);
  }

  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, profiles = this.getState().profiles) {
    return new Map([...profiles].filter((entry) => block(entry[1])));
  }

  static withId(id) {
    return this.getState().profiles.get(id);
  }

  static forUserWithId(id) {
    return this.withFilter(profile => profile.user_id == id);
  }

  static forTeamWithId(id) {
    return this.withFilter(profile => profile.team_id == id);
  }

  static forUserWithIdforTeamWithId(user_id, team_id) {
    const profiles = this.withFilter(profile => {
      return profile.user_id == user_id &&
             profile.team_id == team_id
    });
    return profiles.values().next().value;
  }
}

export default alt.createStore(ProfilesStore, 'ProfilesStore');
