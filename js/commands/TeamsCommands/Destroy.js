import Cleanroom from 'cleanroom';
import Firebase from 'lib/Firebase';

export default class Destroy extends Cleanroom.Command {
  static schema = {
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  };

  static execute(inputs) {
    Firebase.addTaskToQueue('teams__destroy', inputs);
  }
}

Cleanroom.initCommand(Destroy);
