import React from 'react';
import Router from 'react-router';

import AuthenticationActions from './actions/AuthenticationActions';
import routes from './routes';

AuthenticationActions.restoreCurrentUser();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
