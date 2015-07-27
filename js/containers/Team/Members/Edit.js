import React from 'react';
import Radium from 'radium';

import { NotificationsActions } from 'actions';
import { TeamMembersStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { Group, Icon, ProfilePhoto, Toolbar } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { navigator } = props;

    navigator.setTitle("Edit Members");
    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.props.navigator.popView.bind(navigator)}
        >
        Done
      </Toolbar.Item>
    );
    navigator.setRightItem(null);
  }

  deleteMember(id) {
  }

  render() {
    const { team } = this.props;
    const team_members = TeamMembersStore.forTeamWithId(team.id);

    const memberGroupItems = [];
    team_members.forEach(team_member => {
      let user = UsersStore.withId(team_member.user_id);

      memberGroupItems.push(
        <Group.Item>
          <Icon name="delete" style={styles.deleteButton} />
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
  deleteButton: {
    marginRight: 15
  },

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
