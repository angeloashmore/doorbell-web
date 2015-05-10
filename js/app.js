import React from 'react';
import Router from 'react-router';

import UserActions from './actions/UserActions';
import routes from './routes';

UserActions.restoreCurrentUser();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
