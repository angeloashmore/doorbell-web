import React from 'react';
import { RouteHandler } from 'react-router';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';
import Stores from 'stores';
import { Container, MasterPanel } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: Stores.Teams.withId(props.params.id),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ team: Stores.Teams.withId(nextProps.params.id) });
  }

  render() {
    return (
      <Container>
        <MasterPanel>
          <MasterPanel.Heading>Menu</MasterPanel.Heading>
          <MasterPanel.Item to="teamInfo" params={this.props.params} key="info" title="Team Info" icon="team" />
          <MasterPanel.Item to="teamProfile" params={this.props.params} key="profile" title="My Profile" icon="profile" />
          <MasterPanel.Item to="teamMembers" params={this.props.params} key="members" title="Members" icon="members" />
          <MasterPanel.Item to="teamBilling" params={this.props.params} key="billing" title="Billing" icon="billing" />
          <MasterPanel.Item to="teamSettings" params={this.props.params} key="settings" title="Settings" icon="settings" />
        </MasterPanel>

        <RouteHandler />
      </Container>
    );
  }
}
