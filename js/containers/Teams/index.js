import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import authenticatedComponent from 'decorators/authenticatedComponent';
import TeamsStore from 'stores/TeamsStore';

import Pane from 'elements/Pane';

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
        <Pane.Item
          key={id}
          icon="team"
          title={teams[id].get("name")}
          to="team"
          params={{id: id}}
        />
      );
    }

    return (
      <div style={styles.container}>
        <Pane>
          <Pane.Heading>Teams</Pane.Heading>
          {teamsPaneItems}
          <Pane.Item
            to="teamsNew"
            icon="plus"
            iconOnly={true}
            last={true}
          />
        </Pane>

        <RouteHandler />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexGrow: 1
  }
};
