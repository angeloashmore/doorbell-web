import React from 'react';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, RolesActions } from 'actions';
import { ProfilesStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { DetailPanel, Form, Toolbar, Group, ProfilePhoto } from 'elements';

@authenticatedComponent
@reactMixin.decorate(React.addons.LinkedStateMixin)
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

    return {
      team, profiles,
      email: ''
    };
  }

  addMember(e) {
    e.preventDefault();

    let attrs = {
      team_id: this.state.team.id,
      email: this.state.email
    };

    RolesActions.create(attrs)
      .then(() => NotificationsActions.create({ message: "Member added successfully." }))
      .catch((error) => NotificationsActions.createGeneric());
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
          subtitle={team.name}
          />

        <DetailPanel.Body>
          <Group header="Members">
            {[memberGroupItems]}
          </Group>

          <Form>
            <Group header="Add Member">
              <Group.Item title="Email">
                <Form.Input valueLink={this.linkState('email')} placeholder="Email" chromeless={true} hasTitle={true} />
              </Group.Item>
              <Group.Button type="submit" onClick={this.addMember.bind(this)} last={true}>Add Member</Group.Button>
            </Group>
          </Form>
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
    fontSize: 14,
    display: "block"
  }
}
