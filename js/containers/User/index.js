import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import authenticatedComponent from 'decorators/authenticatedComponent';
import UserStore from 'stores/UserStore';

import Container from 'elements/Container';
import MasterPanel from 'elements/MasterPanel';

@authenticatedComponent
@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores(props) {
    return UserStore.getState();
  }

  render() {
    const { user } = this.props;

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