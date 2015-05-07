import React from 'react/addons';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

export default class extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to the home page</p>
      </div>
    );
  }
}
