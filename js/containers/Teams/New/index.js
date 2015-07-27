import React from 'react';

import { TeamsStore } from 'stores'

import { Navigator } from 'components';
import { DetailPanel } from 'elements';

import Create from './Create';

export default class extends React.Component {
  render() {
    return (
      <DetailPanel>
        <Navigator
          title="New Team"
          views={[
            <Create />
          ]}
          container={this}
          />
      </DetailPanel>
    );
  }
}
