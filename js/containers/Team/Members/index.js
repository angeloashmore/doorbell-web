import React from 'react';

import { TeamsStore } from 'stores'

import { Navigator } from 'components';
import { DetailPanel } from 'elements';

import List from './List';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: TeamsStore.withId(parseInt(props.params.id))
    };
  }

  render() {
    const { team } = this.state;

    return (
      <DetailPanel>
        <Navigator
          subtitle={team.name}
          views={[
            <List team={team} />
          ]}
          />
      </DetailPanel>
    );
  }
}
