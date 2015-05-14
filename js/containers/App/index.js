import React from 'react';
import { Link, RouteHandler } from 'react-router';
import AltContainer from 'alt/AltContainer';

import Navigation from 'components/Navigation';

import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

export default class extends React.Component {
  render() {
    return (
      <div className="app">
        <Navigation />

        <RouteHandler />
      </div>
    );
  }
}
