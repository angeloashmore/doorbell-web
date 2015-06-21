import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component {
  render() {
    return (
      <div>
        <Link to="teamsNew">New Team</Link>
      </div>
    );
  }
}
