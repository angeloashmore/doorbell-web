import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import NotificationsActions from 'actions/NotificationsActions';
import TeamsActions from 'actions/TeamsActions';
import TeamsStore from 'stores/TeamsStore';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
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
      name: team.get("name"),
      email: team.get("email")
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
      .catch((error) => NotificationsActions.createFromParseError(error));
  }

  render() {
    const { team } = this.state;

    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title={team.get("name")}
            subtitle="Settings"
            leftItem={<Toolbar.Button disabled={true}>Cancel</Toolbar.Button>}
            rightItem={<Toolbar.Button type="submit" onClick={this.updateTeam.bind(this)}>Save</Toolbar.Button>}
            />
          <Container style={styles.container}>
            <DetailPanel.Group>
              <Form.Label title="Team Name">
                <Form.Input valueLink={this.linkState('name')} placeholder="Team Name" />
              </Form.Label>

              <Form.Label title="Team Email" last={true}>
                <Form.Input valueLink={this.linkState('email')} placeholder="Team Email" />
              </Form.Label>
            </DetailPanel.Group>

            <DetailPanel.Group>
              <DetailPanel.Heading>Delete This Team</DetailPanel.Heading>
              <DetailPanel.p>Once you delete a team, there is no going back. Please be certain.</DetailPanel.p>
              <Form.Button>Delete This Team</Form.Button>
            </DetailPanel.Group>
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
