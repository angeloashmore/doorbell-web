import alt from 'flux/alt';
import Actions from 'actions'

class NotificationsStore {
  constructor() {
    this.bindListeners({
      setNotification: [
        Actions.Notifications.CREATE,
        Actions.Notifications.CREATE_GENERIC
      ],
      deleteNotification: Actions.Notifications.DELETE
    });

    this.notifications = new Map();
  }


  // MARK: Store methods
  setNotifications(notifications) {
    for (let notification of notifications) {
      this.setNotification(notification);
    }
  }

  setNotification(notification) {
    this.notifications.set(notification.id, notification);
  }

  deleteNotification(id) {
    this.notifications.delete(id);
  }
}

export default alt.createStore(NotificationsStore, 'NotificationsStore');
