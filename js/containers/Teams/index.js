import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import TeamsStore from 'stores/TeamsStore';

import TeamItem from './TeamItem';

@connectToStores
export default class extends React.Component {
  static getStores() {
    return [TeamsStore];
  }

  static getPropsFromStores(props) {
    return TeamsStore.getState();
  }

  render() {
    const { teams } = this.props;

    const teamsComponents = [];
    for (let id in this.props.teams) {
      teamsComponents.push(<TeamItem key={id} team={teams[id]} />);
    }

    return (
      <div>
        <Link to="teamsNew">New Team</Link>
        <ul>{teamsComponents}</ul>
      </div>
    );
  }
}
