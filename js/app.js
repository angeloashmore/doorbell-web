import React from 'react';
import Router from 'react-router';

import UserActions from 'actions/UserActions';
import PlansActions from 'actions/PlansActions';
import routes from 'routes';

UserActions.restoreCurrentUser();
PlansActions.fetchAll();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
