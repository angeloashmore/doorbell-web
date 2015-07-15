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

    this.teams = new Map();
  }


  // MARK: Store methods
  setTeams(teams) {
    for (let team of teams) {
      this.setTeam(team);
    }
  }

  setTeam(team) {
    this.teams.set(team.id, team);
  }

  destroyTeam(team) {
    this.teams.delete(team.id);
  }


  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, teams = this.getState().teams) {
    return new Map([...teams].filter((entry) => block(entry[1])));
  }

  static withId(id) {
    return this.getState().teams.get(parseInt(id));
  }
}

export default alt.createStore(TeamsStore, 'TeamsStore');
