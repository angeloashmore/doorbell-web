import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import { TeamsStore } from 'stores'

import { Navigator } from 'components';
import { DetailPanel } from 'elements';

import Home from './Home';

export default class extends React.Component {
  static getStores() {
    return [TeamsStore];
  }

  static getPropsFromStores() {
    return TeamsStore.getState();
  }

  render() {
    const team = TeamsStore.withId(parseInt(this.props.params.id));

    return (
      <DetailPanel>
        <Navigator
          subtitle={team.name}
          views={[
            <Home team={team} />
          ]}
          />
      </DetailPanel>
    );
  }
}
