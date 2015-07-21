import React from 'react/addons';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';

import { DetailPanel, Toolbar, Form, Group } from 'elements';

@authenticatedComponent
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class TeamsNew extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: 'angelo@doorbell.im'
    };
  }

  create(e) {
    e.preventDefault();

    let data = {
      name: this.state.name,
      email: this.state.email
    };

    Actions.Teams.create(data)
      .then(() => this.transitionTo('teams'))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <DetailPanel>
        <Form>

          <Toolbar
            title="New Team"
            rightItem={<Toolbar.Button onClick={this.create.bind(this)}>Create</Toolbar.Button>}
            />

          <DetailPanel.Body>
            <Group header="General">
              <Group.Item title="Name">
                <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" spellCheck={false} chromeless={true} hasTitle={true} />
              </Group.Item>
              <Group.Item title="Email" last={true}>
                <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Team Email" chromeless={true} hasTitle={true} />
              </Group.Item>
            </Group>
          </DetailPanel.Body>

        </Form>
      </DetailPanel>
    );
  }
}

const styles = {
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    padding: 45
  }
};
