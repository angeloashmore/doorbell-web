import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';

import AuthSignIn from 'containers/Auth/SignIn';
import AuthSignUp from 'containers/Auth/SignUp';
import AuthResetPassword from 'containers/Auth/ResetPassword';

import User from 'containers/User';
import UserOverview from 'containers/User/Overview';
import UserGeneral from 'containers/User/General';
import UserBilling from 'containers/User/Billing';

import Teams from 'containers/Teams';
import TeamsNew from 'containers/Teams/New';
import Team from 'containers/Team';
import TeamInfo from 'containers/Team/Info';
import TeamProfile from 'containers/Team/Profile';
import TeamMembers from 'containers/Team/Members';
import TeamMembersAdd from 'containers/Team/Members/Add';
import TeamBilling from 'containers/Team/Billing';
import TeamSettings from 'containers/Team/Settings';

import Support from 'containers/Support';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home} />

    // Authentication
    <Route name="signIn" handler={AuthSignIn} />
    <Route name="signUp" handler={AuthSignUp} />
    <Route name="resetPassword" handler={AuthResetPassword} />

    // User
    <Route name="user" handler={User}>
      <Route name="userOverview" path="overview" handler={UserOverview} />
      <Route name="userGeneral" path="general" handler={UserGeneral} />
      <Route name="userBilling" path="billing" handler={UserBilling} />
    </Route>

    // Teams
    <Route name="teams" path="teams" handler={Teams}>
      <Route name="teamsNew" path="new" handler={TeamsNew} />
      <Route name="team" path=":id" handler={Team}>
        <Route name="teamInfo" path="info" handler={TeamInfo} />
        <Route name="teamProfile" path="profile" handler={TeamProfile} />
        <Route name="teamMembers" path="members" handler={TeamMembers} />
        <Route name="teamMembersAdd" path="members/add" handler={TeamMembersAdd} />
        <Route name="teamBilling" path="billing" handler={TeamBilling} />
        <Route name="teamSettings" path="settings" handler={TeamSettings} />
      </Route>
    </Route>

    // Support
    <Route name="support" path="support" handler={Support} />
  </Route>
);
