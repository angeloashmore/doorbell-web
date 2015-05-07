import React from 'react';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

export default AuthenticatedComponent(
  class extends React.Component {
    render() {
      return(
        <p>Plans page</p>
      );
    }
  }
);
