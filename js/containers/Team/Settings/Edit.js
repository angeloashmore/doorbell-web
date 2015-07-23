import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, TeamsActions } from 'actions';
import { TeamsStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Form, Group, Toolbar  } from 'elements';

@authenticatedComponent
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    let { team } = props;
    team = TeamsStore.withId(team.id);

    this.state = {
      name: team.name,
      email: team.email
    };

    const { navigator } = props;

    navigator.setTitle("Edit Settings");
    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.props.navigator.popView.bind(navigator)}
        >
        Cancel
      </Toolbar.Item>
    );
    navigator.setRightItem(
      <Toolbar.Item
        elType="button"
        type="submit"
        onClick={this.updateTeam.bind(this)}
        >
        Save
      </Toolbar.Item>
    );
  }

  updateTeam(e) {
    e.preventDefault();

    let attrs = {
      name: this.state.name,
      email: this.state.email
    };

    TeamsActions.update(this.props.team.id, attrs)
      .then(this.props.navigator.popView.bind(this.props.navigator))
      .then(() => NotificationsActions.create({ message: "Team updated successfully." }))
      .catch(console.log);
  }

  destroyTeam(e) {
    e.preventDefault();

    const { team } = this.props;

    if (confirm(`Are you sure you want to delete ${team.name}?`)) {
      TeamsActions.destroy(team.id)
        .then(() => NotificationsActions.create({ message: "Your team was successfully deleted." }))
        .catch(console.log);
    }
  }

  render() {
    const { team } = this.props;

    return (
      <div>
        <Group header="General">
          <Group.Item title="Name">
            <Form.Input valueLink={this.linkState('name')} placeholder="Name" chromeless={true} hasTitle={true} />
          </Group.Item>
          <Group.Item title="Team Email" last={true}>
            <Form.Input valueLink={this.linkState('email')} placeholder="Team Email" chromeless={true} hasTitle={true} />
          </Group.Item>
        </Group>

        <Group last={true}>
          <Form.Button onClick={this.destroyTeam.bind(this)}>Delete This Team</Form.Button>
        </Group>
      </div>
    );
  }
}
