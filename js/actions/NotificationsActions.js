import alt from 'flux/alt';

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

      // Destroy the notification automatically.
      setTimeout(() => this.actions.delete(data.id), 5000);

    });
  }

  delete(id) {
    return Promise.resolve().then(() => {
      this.dispatch(id);

    })
  }

  createGeneric() {
    return this.actions.create({ message: "An error occured. Please try again."});
  }
}

export default alt.createActions(NotificationsActions);
