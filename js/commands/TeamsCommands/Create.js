import Cleanroom from 'cleanroom';
import Firebase from 'lib/Firebase';

export default class Create extends Cleanroom.Command {
  static schema = {
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
    required: ['name', 'email'],
  };

  static execute(inputs) {
    Firebase.addTaskToQueue('teams__create', inputs);
  }
}

Cleanroom.initCommand(Create);
