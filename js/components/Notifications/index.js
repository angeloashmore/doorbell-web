import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import { NotificationsStore } from 'stores';
import colors from 'styles/colors';

import Notification from './Notification';

@connectToStores
@Radium
export default class extends React.Component {
  static Notification = Notification;

  static getStores() {
    return [NotificationsStore];
  }

  static getPropsFromStores(props) {
    return NotificationsStore.getState();
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
