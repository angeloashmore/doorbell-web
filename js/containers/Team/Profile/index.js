import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, ProfilesActions } from 'actions';
import { ProfilesStore, TeamsStore, UserStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Container, DetailPanel, Toolbar, Form, Group } from 'elements';

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
    const { user } = UserStore.getState();
    const team = TeamsStore.withId(parseInt(props.params.id));
    const profile = ProfilesStore.forUserWithIdforTeamWithId(user.remote_id, team.id);

    return {
      team, profile,
      title: profile.title,
      email: profile.email
    };
  }

  updateTeam(e) {
    e.preventDefault();

    let attrs = {
      title: this.state.title,
      email: this.state.email
    };

    ProfilesActions.update(this.state.profile.id, attrs)
      .then(() => this.transitionTo("teamInfo", { id: this.state.team.id }))
      .catch((error) => NotificationsActions.createGeneric());
  }

  render() {
    const { team } = this.state;

    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title="My Profile"
            subtitle={team.name}
            leftItem={<Toolbar.Button disabled={true}>Cancel</Toolbar.Button>}
            rightItem={<Toolbar.Button type="submit" onClick={this.updateTeam.bind(this)}>Save</Toolbar.Button>}
            />

          <DetailPanel.Body>
            <Group header="General">
              <Group.Item title="Title">
                <Form.Input valueLink={this.linkState('title')} placeholder="Title" chromeless={true} hasTitle={true} />
              </Group.Item>
              <Group.Item title="Email" last={true}>
                <Form.Input valueLink={this.linkState('email')} placeholder="Email" chromeless={true} hasTitle={true} />
              </Group.Item>
            </Group>
          </DetailPanel.Body>
        </Form>
      </DetailPanel>
    );
  }
}
