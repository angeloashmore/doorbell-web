import alt from 'flux/alt';
import NotificationsActions from 'actions/NotificationsActions';

class NotificationsStore {
  constructor() {
    this.bindListeners({
      setNotification: [
        NotificationsActions.CREATE,
        NotificationsActions.CREATE_GENERIC
      ],
      deleteNotification: NotificationsActions.DELETE
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
