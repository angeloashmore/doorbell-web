import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import AuthLogIn from 'containers/Auth/LogIn';
import AuthSignUp from 'containers/Auth/SignUp';
import Dashboard from 'containers/Dashboard';
import Teams from 'containers/Teams';
import TeamsNew from 'containers/Teams/New';
import TeamsView from 'containers/Teams/View';
import TeamsEdit from 'containers/Teams/Edit';
import User from 'containers/User';
import UserEdit from 'containers/User/Edit';

export default (
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute handler={ Home } />

    // Authentication
    <Route name="login" handler={ AuthLogIn } />
    <Route name="signup" handler={ AuthSignUp } />

    // Dashboard
    <Route name="dashboard" handler={ Dashboard } />

    // Teams
    <Route name="teams" path="teams" handler={Teams} />
    <Route name="teamsNew" path="teams/new" handler={TeamsNew} />
    <Route name="teamsView" path="teams/:id" handler={TeamsView} />
    <Route name="teamsEdit" path="teams/:id/edit" handler={TeamsEdit} />

    // User
    <Route path="user" handler={User} />
    <Route path="user/edit" handler={UserEdit} />
  </Route>
);
