import React from 'react';
import Radium from 'radium';

import { TeamsStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Group, Toolbar  } from 'elements';

import Edit from './Edit';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { navigator } = props;

    navigator.setTitle("Settings");
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
    const team = TeamsStore.withId(this.props.team.id);

    return (
      <div>
        <Group header="General" last={true}>
          <Group.Item title="Name">{team.name}</Group.Item>
          <Group.Item title="Team Email" last={true}>{team.email}</Group.Item>
        </Group>
      </div>
    );
  }
}
