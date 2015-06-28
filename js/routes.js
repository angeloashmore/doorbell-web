import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import AuthLogIn from 'containers/Auth/LogIn';
import AuthSignUp from 'containers/Auth/SignUp';
import Teams from 'containers/Teams';
import TeamsNew from 'containers/Teams/New';
import TeamsView from 'containers/Teams/View';
import Support from 'containers/Support';

export default (
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute handler={Home} />

    // Authentication
    <Route name="login" handler={AuthLogIn} />
    <Route name="signup" handler={AuthSignUp} />

    // Teams
    <Route name="teams" path="teams" handler={Teams}>
      <Route name="teamsNew" path="new" handler={TeamsNew} />
      <Route name="teamsView" path=":id" handler={TeamsView} />
    </Route>

    // Support
    <Route name="support" path="support" handler={Support} />
  </Route>
);
