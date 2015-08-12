import Cleanroom from 'cleanroom';
import Firebase from 'lib/Firebase';

export default class Create extends Cleanroom.Command {
  static schema = {
    properties: {
      teamId: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
    required: ['teamId', 'email'],
  };

  static execute(inputs) {
    Firebase.addTaskToQueue('teamUsers__create', inputs);
  }
}

Cleanroom.initCommand(Create);
