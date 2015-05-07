import React from 'react';
import { Link, RouteHandler } from 'react-router';
import AltContainer from 'alt/AltContainer';

import Navigation from '../components/Navigation';

import AuthenticationActions from '../actions/AuthenticationActions';
import AuthenticationStore from '../stores/AuthenticationStore';

export default class extends React.Component {
  componentDidMount() {
    AuthenticationActions.restoreCurrentUser();
  }

  render() {
    return (
      <div className="app">
        <AltContainer store={AuthenticationStore} component={Navigation} />

        <RouteHandler />
      </div>
    );
  }
}
