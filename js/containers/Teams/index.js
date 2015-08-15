import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';
import reactMixin from 'react-mixin';
import { r, QueryRequest, DefaultMixin as RethinkMixin } from 'react-rethinkdb';

import { authenticatedComponent } from 'decorators';
import { UserStore } from 'stores';

import { Container, MasterPanel } from 'elements';

@authenticatedComponent
@reactMixin.decorate(RethinkMixin)
@Radium
export default class extends React.Component {
  isMounted() {
    return true;
  }

  observe() {
    const { user } = UserStore.getState();
    const query = r.table('teams').filter(team => team('users').contains(user.user_id));

    return {
      teams: new QueryRequest({ query, changes: true, initial: [] }),
    };
  }

  render() {
    const { teams } = this.data;

    const teamsPaneItems = [];
    teams.value().forEach((team, id) => {
      teamsPaneItems.push(
        <MasterPanel.Item
          key={id}
          icon="team"
          title={team.name}
          to="team"
          params={{id: team.id}}
        />
      );
    });

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
