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
    return (
      <div style={styles.container}>
        <Pane>
          <PaneHeading>Teams</PaneHeading>
          <PaneItem to="/" title="Dower Realty" />
        </Pane>
        <Pane last="true">
          <PaneHeading>Menu</PaneHeading>
          <PaneItem to="/" title="Team Info" />
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
