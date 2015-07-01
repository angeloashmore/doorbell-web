import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import NotificationsActions from 'actions/NotificationsActions';
import TeamsActions from 'actions/TeamsActions';
import TeamsStore from 'stores/TeamsStore';
import Container from 'elements/Container';
import HeaderBar from 'elements/HeaderBar';
import Panel from 'elements/Panel';
import Form from 'elements/Form';

@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.setupState(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(nextProps.params.id));
  }

  setupState(id) {
    const team = TeamsStore.withId(id);

    return {
      team: team,
      name: team.get("name")
    };
  }

  updateTeam(e) {
    e.preventDefault();

    let attrs = {
      name: this.state.name
    };

    TeamsActions.update(this.state.team.id, attrs)
      .then(() => this.transitionTo("teamInfo", { id: this.state.team.id }))
      .catch((error) => NotificationsActions.createFromParseError(error));
  }

  render() {
    const headerBar = (
      <HeaderBar
        title={this.state.team.get("name")}
        subtitle="Settings"
        leftButton={<HeaderBar.Button disabled={true}>Cancel</HeaderBar.Button>}
        rightButton={<HeaderBar.Button type="submit" onClick={this.updateTeam.bind(this)}>Save</HeaderBar.Button>}
      />
    );

    return (
      <Container>
        <Form>
          {headerBar}
          <Panel>
            <Panel.Group>
              <Panel.Heading>Team Name</Panel.Heading>
              <Form.Input valueLink={this.linkState('name')} placeholder="Team Name" />
            </Panel.Group>

            <Panel.Group>
              <Panel.Heading>Delete This Team</Panel.Heading>
              <Panel.p>Once you delete a team, there is no going back. Please be certain.</Panel.p>
              <Form.Button title="Delete This Team" />
            </Panel.Group>
          </Panel>
        </Form>
      </Container>
    );
  }
}
