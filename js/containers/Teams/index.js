import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import authenticatedComponent from 'decorators/authenticatedComponent';
import TeamsStore from 'stores/TeamsStore';

import Pane from 'components/Pane';
import PaneHeading from 'elements/PaneHeading';
import PaneItem from 'elements/PaneItem';

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
    for (let id in this.props.teams) {
      teamsPaneItems.push(<PaneItem key={id} to="/" title={teams[id].get("name")} icon="team" />);
    }

    return (
      <div style={styles.container}>
        <Pane>
          <PaneHeading>Teams</PaneHeading>
          {teamsPaneItems}
          <PaneItem to="teamsNew" icon="plus" iconOnly="true" last="true" />
        </Pane>
        <Pane last="true">
          <PaneHeading>Menu</PaneHeading>
          <PaneItem to="/" title="Team Info" icon="team" />
        </Pane>
      </div>
    );
  }
}

const styles = {
  container: {
    alignContent: "stretch",
    display: "flex"
  }
};
