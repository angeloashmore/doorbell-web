import React from 'react';
import { Link, RouteHandler } from 'react-router';

import Navigation from '../components/Navigation';

import AuthenticationStore from '../stores/AuthenticationStore';

export default class extends React.Component {
  constructor() {
    super();
    this.state = this.getState();
  }

  getState() {
    return {
      userLoggedIn: AuthenticationStore.isLoggedIn(),
      user: AuthenticationStore.getState().user
    };
  }

  componentDidMount() {
    AuthenticationStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    AuthenticationStore.unlisten(this.onChange.bind(this));
  }

  onChange() {
    this.setState(this.getState());
  }

  render() {
    return (
      <div className="app">
      <Navigation user={this.state.user} />

        <RouteHandler />
      </div>
    );
  }
}
