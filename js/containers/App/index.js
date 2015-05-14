import React from 'react';
import { Link, RouteHandler } from 'react-router';

import Navigation from 'components/Navigation';

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
