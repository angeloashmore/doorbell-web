import alt from 'flux/alt';
import TeamsActions from 'actions/TeamsActions';

class TeamsStore {
  constructor() {
    this.bindListeners({
      setTeams: TeamsActions.FETCH_ALL_FOR_CURRENT_USER,
      setTeam: [
        TeamsActions.CREATE,
        TeamsActions.UPDATE
      ],
      destroyTeam: TeamsActions.DESTROY
    });

    this.teams = {};
  }


  // MARK: Store methods
  setTeams(teams) {
    for (let team of teams) {
      this.setTeam(team);
    }
  }

  setTeam(team) {
    this.teams[team.id] = team;
  }

  destroyTeam(team) {
    delete this.teams[team.id];
  }


  // MARK: Private methods


  // MARK: Public methods
  static withId(id) {
    const { teams } = this.getState();
    return teams[id];
  }
}

export default alt.createStore(TeamsStore, 'TeamsStore');
