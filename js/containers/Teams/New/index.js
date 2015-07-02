import React from 'react/addons';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import NotificationsActions from 'actions/NotificationsActions';
import TeamsActions from 'actions/TeamsActions';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Form from 'elements/Form';

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

    TeamsActions.create(data)
      .then(() => this.transitionTo('teams'))
      .catch((error) => NotificationsActions.createFromParseError(error));
  }

  render() {
    return (
      <DetailPanel>
        <Form>
        <Toolbar
          title="New Team"
          rightItem={<Toolbar.Button onClick={this.create.bind(this)}>Create</Toolbar.Button>}
          />
        <Container style={styles.container}>
          <Form.Label title="Name">
            <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" spellCheck={false} />
          </Form.Label>
          <Form.Label title="Team Email">
            <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Team Email" />
          </Form.Label>
        </Container>
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
