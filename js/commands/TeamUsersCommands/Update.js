import Cleanroom from 'cleanroom';
import Firebase from 'lib/Firebase';

export default class Update extends Cleanroom.Command {
  static schema = {
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  };

  static execute(inputs) {
    Firebase.addTaskToQueue('teamUsers__update', inputs);
  }
}

Cleanroom.initCommand(Update);
