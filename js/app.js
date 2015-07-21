import React from 'react';
import Router from 'react-router';

import Stores from 'stores';
import Actions from 'actions';

import routes from 'routes';

Actions.User.restore();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
