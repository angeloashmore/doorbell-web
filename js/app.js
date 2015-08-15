import React from 'react';
import Router from 'react-router';

import 'stores';
import { UserActions } from 'actions';
import routes from 'routes';
import 'lib/RethinkDB';

UserActions.restore();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
