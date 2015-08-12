import Firebase from 'firebase';

import config from 'config';
import { UserStore } from 'stores';

const ref = new Firebase(config.Firebase.URL);
const queueTasksRef = ref.child('queue/tasks');

ref.addTaskToQueue = function(action, data) {
  const { user } = UserStore.getState();
  const task = Object.assign(data, {
    _action: action,
    _uid: user.uid
  });
  queueTasksRef.push(task);
};

export default ref;
