import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component {
  render() {
    const team = this.props.team;

    return (
      <li key={team.id}>
        <Link to={`/teams/${team.id}`}>{team.get("name")}</Link>
      </li>
    );
  }
}
