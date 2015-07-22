import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import { TeamsStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Container, MasterPanel } from 'elements';

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
    teams.forEach((team, id) => {
      teamsPaneItems.push(
        <MasterPanel.Item
          key={id}
          icon="team"
          title={team.name}
          to="team"
          params={{id: id}}
        />
      );
    })

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
