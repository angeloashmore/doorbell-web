import React from 'react';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';
import { ProfilesStore, TeamsStore, UserStore } from 'stores';

import { Group } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  render() {
    const { team } = this.props;
    const { user } = UserStore.getState();
    const profile = ProfilesStore.forUserWithIdforTeamWithId(user.remote_id, team.id);

    return (
      <div>
        <Group header="General">
          <Group.Item title="Name">{team.name}</Group.Item>
          <Group.Item title="Team Email" last={true}>{team.email}</Group.Item>
        </Group>

        <Group header="Your Profile" last={true}>
          <Group.Item title="Title" last={true}>{profile.title}</Group.Item>
        </Group>
      </div>
    );
  }
}
