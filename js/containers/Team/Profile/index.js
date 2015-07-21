import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import Actions from 'actions';
import authenticatedComponent from 'decorators/authenticatedComponent';
import Stores from 'stores';

import { Container, DetailPanel, Toolbar, Form, Group } from 'elements';

@authenticatedComponent
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.setupState(parseInt(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(parseInt(nextProps.params.id)));
  }

  setupState(id) {
    const team = Stores.Teams.withId(id);
    const profile = Stores.Profiles.forUserWithIdforTeamWithId(Stores.User.getState().user.remote_id, team.id);

    return {
      team: team,
      profile: profile,
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

    Actions.Profiles.update(this.state.profile.id, attrs)
      .then(() => this.transitionTo("teamInfo", { id: this.state.team.id }))
      .catch((error) => Actions.Notifications.createGeneric());
  }

  render() {
    const { team } = this.state;

    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title="My Profile"
            subtitle={this.state.team.name}
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
