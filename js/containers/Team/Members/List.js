import React from 'react';
import Radium from 'radium';

import { NotificationsActions } from 'actions';
import { ProfilesStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { DetailPanel, Form, Icon, Toolbar, Group, ProfilePhoto } from 'elements';

import Add from './Add';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { team, navigator } = props;

    this.state = {
      team,
      profiles: ProfilesStore.forTeamWithId(team.id),
    };

    navigator.setTitle("Members");
    navigator.setRightItem(
      <Toolbar.Item
        icon="add"
        onClick={this.handleAddButton.bind(this)}
      />
    );
  }

  handleAddButton() {
    this.props.navigator.pushView(
      <Add team={this.state.team} />
    );
  }

  render() {
    const { team, profiles } = this.state;

    const memberGroupItems = [];
    profiles.forEach(profile => {
      let user = UsersStore.withId(profile.user_id);

      memberGroupItems.push(
        <Group.Item>
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
  photo: {
    height: 40,
    marginRight: 10,
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
