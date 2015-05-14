import React from 'react';

import authenticatedComponent from 'decorators/authenticatedComponent';

@authenticatedComponent
export default class extends React.Component {
  render() {
    return (
      <div>
        <p>Viewing the <strong>protected</strong> Dashboard.</p>
      </div>
    );
  }
}
