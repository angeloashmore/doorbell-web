import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import LogIn from './containers/LogIn';
import SignUp from './containers/SignUp';
import Dashboard from './containers/Dashboard';

export default (
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute handler={ Home } />
    <Route name="login" handler={ LogIn } />
    <Route name="signup" handler={ SignUp } />
    <Route name="dashboard" handler={ Dashboard } />
  </Route>
);
