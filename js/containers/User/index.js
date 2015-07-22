import React from 'react';
import { RouteHandler } from 'react-router';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';

import { Container, MasterPanel } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  render() {
    return (
      <Container>
        <MasterPanel>
          <MasterPanel.Heading>Account</MasterPanel.Heading>
          <MasterPanel.Item title="Overview" icon="info" to="userOverview" />
          <MasterPanel.Item title="General" icon="settings" to="userGeneral" />
          <MasterPanel.Item title="Billing" icon="billing" to="userBilling" />
        </MasterPanel>

        <RouteHandler />
      </Container>
    );
  }
}
