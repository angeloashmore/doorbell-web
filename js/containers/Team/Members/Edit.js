import React from 'react';
import Radium from 'radium';

import { NotificationsActions } from 'actions';
import { ProfilesStore, TeamsStore, UsersStore } from 'stores';
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
    const profiles = ProfilesStore.forTeamWithId(team.id);

    const memberGroupItems = [];
    profiles.forEach(profile => {
      let user = UsersStore.withId(profile.user_id);

      memberGroupItems.push(
        <Group.Item>
          <Icon name="delete" style={styles.deleteButton} />
          <ProfilePhoto
            profile={profile}
            style={styles.photo}
            />
          <div style={styles.nameAndTitle}>
            <span style={styles.name}>{user.name}</span>
            <span style={styles.title}>{profile.title}</span>
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
