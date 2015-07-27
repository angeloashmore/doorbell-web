import alt from 'flux/alt';
import { TeamMembersActions } from 'actions';

class TeamMembersStore {
  constructor() {
    this.bindListeners({
      setTeamMembers: TeamMembersActions.FETCH_ALL_FOR_CURRENT_USER,
      setTeamMember: [
        TeamMembersActions.CREATE,
        TeamMembersActions.UPDATE
      ]
    });

    this.team_members = new Map();
  }


  // MARK: Store methods
  setTeamMembers(team_members) {
    for (let team_member of team_members) {
      this.setTeamMember(team_member);
    }
  }

  setTeamMember(team_member) {
    this.team_members.set(team_member.id, team_member);
  }

  deleteTeamMember(team_member) {
    this.team_members.delete(team_member.id);
  }

  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, team_members = this.getState().team_members) {
    return new Map([...team_members].filter((entry) => block(entry[1])));
  }

  static withId(id) {
    return this.getState().team_members.get(id);
  }

  static forUserWithId(id) {
    return this.withFilter(team_member => team_member.user_id == id);
  }

  static forTeamWithId(id) {
    return this.withFilter(team_member => team_member.team_id == id);
  }

  static forUserWithIdforTeamWithId(user_id, team_id) {
    const team_members = this.withFilter(team_member => {
      return team_member.user_id == user_id &&
             team_member.team_id == team_id
    });
    return team_members.values().next().value;
  }
}

export default alt.createStore(TeamMembersStore, "TeamMembersStore");
