import React from 'react';
import Router from 'react-router';

import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import BillingsActions from 'actions/BillingsActions';
import PlansActions from 'actions/PlansActions';
import ProfilesActions from 'actions/ProfilesActions';
import routes from 'routes';

UserActions.restoreCurrentUser()
  .then(function() {
    if (UserStore.isLoggedIn()) {
      console.log(UserStore.isLoggedIn());
      console.log(UserStore.getState());
      BillingsActions.fetchAllForCurrentUser();
      PlansActions.fetchAll();
      ProfilesActions.fetchAllForCurrentUser();
    }
  });

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
