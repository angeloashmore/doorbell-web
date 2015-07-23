import React from 'react';
import Radium from 'radium';

import { ProfilesStore, UserStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Form, Group, Toolbar  } from 'elements';

import Edit from './Edit';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { navigator } = props;

    navigator.setTitle("My Profile");
    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.handleEditButton.bind(this)}
        >
        Edit
      </Toolbar.Item>
    );
    navigator.setRightItem(null);
  }

  handleEditButton() {
    this.props.navigator.pushView(
      <Edit team={this.props.team} />
    );
  }

  render() {
    const { team } = this.props;
    const { user } = UserStore.getState();
    const profile = ProfilesStore.forUserWithIdforTeamWithId(user.remote_id, team.id);

    return (
      <div>
        <Group header="General" last={true}>
          <Group.Item title="Title">{profile.title}</Group.Item>
          <Group.Item title="Email" last={true}>{profile.email}</Group.Item>
        </Group>
      </div>
    );
  }
}
