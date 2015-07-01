import alt from 'flux/alt';
import parseErrorMessages from 'lib/parseErrorMessages';

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
      setTimeout(() => this.actions.destroy(data.id), 5000);

    });
  }

  destroy(id) {
    return Promise.resolve().then(() => {
      this.dispatch(id);

    })
  }

  createGeneric() {
    return this.actions.create({ message: "An error occured. Please try again."});
  }

  createFromParseError(error) {
    const message = parseErrorMessages.get(error.code);

    if (message === undefined) return this.actions.createGeneric();

    return this.actions.create({ message: message });
  }

}

export default alt.createActions(NotificationsActions);
