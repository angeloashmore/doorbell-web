import alt from 'flux/alt';
import NotificationsActions from 'actions/NotificationsActions';

class NotificationsStore {
  constructor() {
    this.bindListeners({
      setNotification: [
        NotificationsActions.CREATE,
        NotificationsActions.CREATE_GENERIC
      ],
      destroyNotification: NotificationsActions.DESTROY
    });

    this.notifications = [];
  }


  // MARK: Store methods
  setNotifications(notifications) {
    for (let notification of notifications) {
      this.setNotification(notification);
    }
  }

  setNotification(notification) {
    this.notifications[notification.id] = notification;
  }

  destroyNotification(id) {
    delete this.notifications[id];
  }
}

export default alt.createStore(NotificationsStore, 'NotificationsStore');
