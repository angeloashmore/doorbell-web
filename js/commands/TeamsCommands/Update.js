import Cleanroom from 'cleanroom';
import Firebase from 'lib/Firebase';

export default class Update extends Cleanroom.Command {
  static schema = {
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
    required: ['id', 'name', 'email'],
  };

  static execute(inputs) {
    Firebase.addTaskToQueue('teams__update', inputs);
  }
}

Cleanroom.initCommand(Update);
