import { DefaultSession as RethinkSession } from 'react-rethinkdb';
import { UserStore } from 'stores';

export default function connect() {
  const { jwt } = UserStore.getState();

  RethinkSession.connect({
    host: 'localhost',
    port: 8000,
    path: `/?token=${jwt}`,
    secure: false,
    db: 'doorbell_dev',
  });
}
