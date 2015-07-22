import React from 'react';
import Radium from 'radium';

import { ProfilesStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { DetailPanel, Toolbar, Group, ProfilePhoto } from 'elements';

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
    const team = TeamsStore.withId(parseInt(props.params.id));
    const profiles = ProfilesStore.forTeamWithId(team.id);
    return { team, profiles };
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
      <DetailPanel>
        <Toolbar
          title="Members"
          subtitle={this.state.team.name}
          />

        <DetailPanel.Body>
          <Group header="Members">
            {[memberGroupItems]}
          </Group>
        </DetailPanel.Body>
      </DetailPanel>
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
    fontSize: 12,
    display: "block"
  }
}
