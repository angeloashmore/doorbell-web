import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import { NotificationsActions, TeamMembersActions } from 'actions';
import { TeamMembersStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { Group, Icon, ProfilePhoto, Toolbar } from 'elements';

@authenticatedComponent
@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [TeamMembersStore];
  }

  static getPropsFromStores() {
    return TeamMembersStore.getState();
  }

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
    if (confirm("Are you sure you want to delete this member?")) {
      TeamMembersActions.destroy(id)
        .then(() => NotificationsActions.create({ message: "Member deleted successfully." }))
        .catch(NotificationsActions.create);
    }
  }

  render() {
    const { team } = this.props;
    const team_members = TeamMembersStore.forTeamWithId(team.id);

    const memberGroupItems = [];
    team_members.forEach(team_member => {
      let user = UsersStore.withId(team_member.user_id);

      memberGroupItems.push(
        <Group.Item>
          <Icon name="delete" style={styles.deleteButton} onClick={() => this.deleteMember(team_member.id)} />
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
