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
      BillingsActions.fetchAllForCurrentUser();
      PlansActions.fetchAll();
      ProfilesActions.fetchAllForCurrentUser();
    }
  });

// Handle unhandled promise errors.
window.addEventListener("unhandledrejection", function(event) {
  event.preventDefault();
  console.error("An error occured within a Promise and was not handled. The raw error object has been included.", event.detail);
});

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
