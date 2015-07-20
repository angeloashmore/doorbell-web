import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import NotificationsActions from 'actions/NotificationsActions';
import TeamsActions from 'actions/TeamsActions';
import TeamsStore from 'stores/TeamsStore';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Form from 'elements/Form';
import Group from 'elements/Group';

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
    const team = TeamsStore.withId(id);

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

    this.transitionTo("teams");

    TeamsActions.destroy(this.state.team.id)
      .then(() => NotificationsActions.create({ message: "Your team was successfully deleted." }))
      .catch((error) => console.log(error));
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
