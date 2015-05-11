import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import AuthLogIn from './containers/Auth/LogIn';
import AuthSignUp from './containers/Auth/SignUp';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import ProfileEdit from './containers/Profile/Edit';
import Plans from './containers/Plans';
import Billing from './containers/Billing';

export default (
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute handler={ Home } />
    <Route name="login" handler={ AuthLogIn } />
    <Route name="signup" handler={ AuthSignUp } />
    <Route name="dashboard" handler={ Dashboard } />
    <Route name="profile" handler={ Profile } />
    <Route name="profile__edit" handler={ ProfileEdit } />
    <Route name="plans" handler={ Plans } />
    <Route name="billing" handler={ Billing } />
  </Route>
);
