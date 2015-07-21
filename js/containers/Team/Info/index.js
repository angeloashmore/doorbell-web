import React from 'react';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';
import Stores from 'stores';

import { Container, DetailPanel, Toolbar, Group } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const team = Stores.Teams.withId(parseInt(props.params.id));

    this.state = {
      team: team,
      profile: Stores.Profiles.forUserWithIdforTeamWithId(Stores.User.getState().user.remote_id, team.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ team: Stores.Teams.withId(parseInt(nextProps.params.id)) });
  }

  render() {
    const { team, profile } = this.state;

    return (
      <DetailPanel>
        <Toolbar
          title="Team Info"
          subtitle={this.state.team.name}
          />

        <DetailPanel.Body>
          <Group header="General">
            <Group.Item title="Name">{team.name}</Group.Item>
            <Group.Item title="Team Email" last={true}>{team.email}</Group.Item>
          </Group>

          <Group header="Your Profile">
            <Group.Item title="Title">{profile.title}</Group.Item>
          </Group>
        </DetailPanel.Body>
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
