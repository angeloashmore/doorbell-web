import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './containers/App';
import LogIn from './containers/LogIn';
import SignUp from './containers/SignUp';

export default (
  <Route name="app" path="/" handler={ App }>
    <Route name="login" handler={ LogIn } />
    <Route name="signup" handler={ SignUp } />
  </Route>
);
