import React from 'react';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';
import { ProfilesStore, TeamsStore, UserStore } from 'stores';

import { Container, DetailPanel, Toolbar, Group } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setupState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(nextProps));
  }

  setupState(props) {
    const { user } = UserStore.getState();
    const team = TeamsStore.withId(parseInt(props.params.id));
    const profile = ProfilesStore.forUserWithIdforTeamWithId(user.remote_id, team.id);

    return {
      team, profile
    };
  }

  render() {
    const { team, profile } = this.state;

    return (
      <DetailPanel>
        <Toolbar
          title="Team Info"
          subtitle={team.name}
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
