import React from 'react';
import Router from 'react-router';

import UsersStore from 'stores/UsersStore';
import UsersActions from 'actions/UsersActions';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import TeamsActions from 'actions/TeamsActions';
import BillingsActions from 'actions/BillingsActions';
import PlansActions from 'actions/PlansActions';
import ProfilesActions from 'actions/ProfilesActions';
import routes from 'routes';

UserActions.restore();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
