import React from 'react';
import Radium from 'radium';

import { NotificationsActions } from 'actions';
import { TeamMembersStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { Group, ProfilePhoto, Toolbar } from 'elements';

import Add from './Add';
import Edit from './Edit';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { navigator } = props;

    navigator.setTitle("Members");
    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.handleEditButton.bind(this)}
        >
        Edit
      </Toolbar.Item>
    );
    navigator.setRightItem(
      <Toolbar.Item
        icon="add"
        onClick={this.handleAddButton.bind(this)}
      />
    );
  }

  handleEditButton() {
    this.props.navigator.pushView(
      <Edit team={this.props.team} />
    );
  }

  handleAddButton() {
    this.props.navigator.pushView(
      <Add team={this.props.team} />
    );
  }

  render() {
    const { team } = this.props;
    const team_members = TeamMembersStore.forTeamWithId(team.id);

    const memberGroupItems = [];
    team_members.forEach(team_member => {
      let user = UsersStore.withId(team_member.user_id);

      memberGroupItems.push(
        <Group.Item>
          <ProfilePhoto
            team_member={team_member}
            style={styles.photo}
            />
          <div style={styles.nameAndTitle}>
            <span style={styles.name}>{user.name}</span>
            <span style={styles.title}>{team_member.title}</span>
          </div>
        </Group.Item>
      );
    });

    return (
      <div>
        <Group header="Members" last={true}>
          {[memberGroupItems]}
        </Group>
      </div>
    );
  }
}

const styles = {
  photo: {
    height: 40,
    marginRight: 15,
    width: 40
  },

  nameAndTitle: {
    marginRight: 15,
  },

  name: {
    color: colors.get("textPronounced"),
    display: "block"
  },

  title: {
    fontSize: 14,
    display: "block"
  }
}
