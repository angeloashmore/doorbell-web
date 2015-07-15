import React from 'react';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import UserStore from 'stores/UserStore';
import TeamsStore from 'stores/TeamsStore';
import ProfilesStore from 'stores/ProfilesStore';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Group from 'elements/Group';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const team = TeamsStore.withId(parseInt(props.params.id));

    this.state = {
      team: team,
      profile: ProfilesStore.forUserWithIdforTeamWithId(UserStore.getState().user.remote_id, team.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ team: TeamsStore.withId(parseInt(nextProps.params.id)) });
  }

  render() {
    const { team, profile } = this.state;

    return (
      <DetailPanel>
        <Toolbar
          title="Team Info"
          subtitle={this.state.team.name}
          />

        <Group header="General">
          <Group.Item title="Name">{team.name}</Group.Item>
          <Group.Item title="Team Email" last={true}>{team.email}</Group.Item>
        </Group>

        <Group header="Your Profile">
          <Group.Item title="Title">{profile.title}</Group.Item>
        </Group>
      </DetailPanel>
    );
  }
}

const styles = {
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    padding: 45
  }
};
