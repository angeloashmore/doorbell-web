import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import authenticatedComponent from 'decorators/authenticatedComponent';
import TeamsStore from 'stores/TeamsStore';

import Container from 'elements/Container';
import MasterPanel from 'elements/MasterPanel';

@authenticatedComponent
@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [TeamsStore];
  }

  static getPropsFromStores(props) {
    return TeamsStore.getState();
  }

  render() {
    const { teams } = this.props;

    const teamsPaneItems = [];
    for (let id in teams) {
      teamsPaneItems.push(
        <MasterPanel.Item
          key={id}
          icon="team"
          title={teams[id].get("name")}
          to="team"
          params={{id: id}}
        />
      );
    }

    return (
      <Container>
        <MasterPanel>
          <MasterPanel.Heading>Teams</MasterPanel.Heading>
          {teamsPaneItems}
          <MasterPanel.Item
            to="teamsNew"
            icon="plus"
            iconOnly={true}
            last={true}
          />
        </MasterPanel>

        <RouteHandler />
      </Container>
    );
  }
}
