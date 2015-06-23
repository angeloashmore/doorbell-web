import React from 'react';

import TeamsStore from 'stores/TeamsStore';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: TeamsStore.withId(props.params.id)
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.team.get("name")}</p>
      </div>
    );
  }
}
