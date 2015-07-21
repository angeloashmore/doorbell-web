import React from 'react';
import Router from 'react-router';

import Actions from 'actions';
import UserStore from 'stores/UserStore';
import routes from 'routes';

Actions.User.restore();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
