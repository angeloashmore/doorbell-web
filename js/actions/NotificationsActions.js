import alt from 'flux/alt';
import Parse from 'lib/Parse';

class NotificationsActions {
  create(attrs) {
    return Promise.resolve().then(() => {
      let data = {
        id: Date.now(),
        message: attrs.message
      };

      return data;

    }).then((data) => {
      this.dispatch(data);

    });
  }

  createGeneric() {
    return Promise.resolve().then(() => {
      let data = {
        id: Date.now(),
        message: "An error occured. Please try again."
      };

      return data;
    }).then((data) => {
      this.dispatch(data);

    });
  }

  destroy(id) {
    return Promise.resolve().then(() => {
      this.dispatch(id);

    })
  }
}

export default alt.createActions(NotificationsActions);
