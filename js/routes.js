import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import AuthLogIn from 'containers/Auth/LogIn';
import AuthSignUp from 'containers/Auth/SignUp';
import Dashboard from 'containers/Dashboard';
import Organizations from 'containers/Organizations';
import OrganizationsNew from 'containers/Organizations/New';
import OrganizationsView from 'containers/Organizations/View';
import OrganizationsEdit from 'containers/Organizations/Edit';
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

    // Organizations
    <Route name="organizations" path="organizations" component={Organizations} />
    <Route name="organizationsNew" path="organizations/new" component={OrganizationsNew} />
    <Route name="organizationsView" path="organizations/:id" component={OrganizationsView} />
    <Route name="organizationsEdit" path="organizations/:id/edit" component={OrganizationsEdit} />

    // User
    <Route path="user" component={User} />
    <Route path="user/edit" component={UserEdit} />
  </Route>
);
