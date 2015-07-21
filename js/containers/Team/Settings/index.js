import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import Actions from 'actions';
import { authenticatedComponent } from 'decorators';
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

    return {
      team: team,
      name: team.name,
      email: team.email
    };
  }

  updateTeam(e) {
    e.preventDefault();

    let attrs = {
      name: this.state.name,
      email: this.state.email
    };

    TeamsActions.update(this.state.team.id, attrs)
      .then(() => this.transitionTo("teamInfo", { id: this.state.team.id }))
      .catch((error) => NotificationsActions.createGeneric());
  }

  destroyTeam(e) {
    e.preventDefault();

    if (confirm(`Are you sure you want to delete ${this.state.team.name}?`)) {
      this.transitionTo("teams");

      Actions.Teams.destroy(this.state.team.id)
        .then(() => Actions.Notifications.create({ message: "Your team was successfully deleted." }))
        .catch((error) => console.log(error));
    }
  }

  render() {
    const { team } = this.state;

    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title="Settings"
            subtitle={this.state.team.name}
            leftItem={<Toolbar.Button disabled={true}>Cancel</Toolbar.Button>}
            rightItem={<Toolbar.Button type="submit" onClick={this.updateTeam.bind(this)}>Save</Toolbar.Button>}
            />

          <DetailPanel.Body>
            <Group header="General">
              <Group.Item title="Name">
                <Form.Input valueLink={this.linkState('name')} placeholder="Name" chromeless={true} hasTitle={true} />
              </Group.Item>
              <Group.Item title="Team Email" last={true}>
                <Form.Input valueLink={this.linkState('email')} placeholder="Team Email" chromeless={true} hasTitle={true} />
              </Group.Item>
            </Group>

            <Group>
              <Form.Button onClick={this.destroyTeam.bind(this)}>Delete This Team</Form.Button>
            </Group>
          </DetailPanel.Body>
        </Form>
      </DetailPanel>
    );
  }
}
