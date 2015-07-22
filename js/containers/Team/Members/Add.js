import React from 'react';
import reactMixin from 'react-mixin';
import { Navigation } from 'react-router';
import Radium from 'radium';

import { NotificationsActions, RolesActions } from 'actions';
import { ProfilesStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { DetailPanel, Form, Toolbar, Group, ProfilePhoto } from 'elements';

@authenticatedComponent
@reactMixin.decorate(Navigation)
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
    const { team } = this.state;

    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title="Add Member"
            subtitle={team.name}
            leftItem={<Toolbar.Link to="teamMembers" params={this.props.params}>Cancel</Toolbar.Link>}
            rightItem={<Toolbar.Button type="submit" onClick={this.addMember.bind(this)}>Add</Toolbar.Button>}
            />

          <DetailPanel.Body>
            <Group header="Member Details">
              <Group.Item title="Email">
                <Form.Input valueLink={this.linkState('email')} placeholder="Email" chromeless={true} hasTitle={true} />
              </Group.Item>
            </Group>
          </DetailPanel.Body>
        </Form>
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
