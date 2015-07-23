import alt from 'flux/alt';
import { NotificationsActions } from 'actions'

class NotificationsStore {
  constructor() {
    this.bindListeners({
      setNotification: [
        NotificationsActions.CREATE,
        NotificationsActions.CREATE_GENERIC
      ],
      destroyNotification: NotificationsActions.DESTROY
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

  destroyNotification(id) {
    this.notifications.delete(id);
  }
}

export default alt.createStore(NotificationsStore, 'NotificationsStore');
