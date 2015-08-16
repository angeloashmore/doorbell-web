import React, { Component, PropTypes } from 'react';

import Notification from './Notification';

export default class extends Component {
  static Notification = Notification;

  static propTypes = {
    notifictions: PropTypes.array.isRequired
  };

  static defaultProps = {
    notifications: []
  }

  render() {
    const { notifications } = this.props;

    const notificationItems = [];
    notifications.forEach((notification, id) => {
      notificationItems.push(
        <Notification key={id} id={id}>{notification.message}</Notification>
      );
    })

    return (
      <ul>
        {notificationItems}
      </ul>
    );
  }
}
