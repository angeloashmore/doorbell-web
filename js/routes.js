import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import AuthSignIn from 'containers/Auth/SignIn';
import AuthSignUp from 'containers/Auth/SignUp';
import AuthForgotPassword from 'containers/Auth/ForgotPassword';
import Teams from 'containers/Teams';
import TeamsNew from 'containers/Teams/New';
import Team from 'containers/Team';
import TeamInfo from 'containers/Team/Info';
import TeamProfile from 'containers/Team/Profile';
import TeamMembers from 'containers/Team/Members';
import TeamBilling from 'containers/Team/Billing';
import TeamSettings from 'containers/Team/Settings';
import Support from 'containers/Support';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home} />

    // Authentication
    <Route name="signIn" handler={AuthSignIn} />
    <Route name="signUp" handler={AuthSignUp} />
    <Route name="forgotPassword" handler={AuthForgotPassword} />

    // Teams
    <Route name="teams" path="teams" handler={Teams}>
      <Route name="teamsNew" path="new" handler={TeamsNew} />
      <Route name="team" path=":id" handler={Team}>
        <Route name="teamInfo" path="info" handler={TeamInfo} />
        <Route name="teamProfile" path="profile" handler={TeamProfile} />
        <Route name="teamMembers" path="members" handler={TeamMembers} />
        <Route name="teamBilling" path="billing" handler={TeamBilling} />
        <Route name="teamSettings" path="settings" handler={TeamSettings} />
      </Route>
    </Route>

    // Support
    <Route name="support" path="support" handler={Support} />
  </Route>
);
