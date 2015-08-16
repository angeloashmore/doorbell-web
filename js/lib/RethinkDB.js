import { connect as RethinkDBConnect, rethinkdb } from 'rethinkdb-websocket-client';
import { UserStore } from 'stores';

export const r = rethinkdb;

class RethinkDB {
  constructor() {
    this.conn = null;
  }

  connect() {
    if (this.isConnected()) throw new Error('Already connected to database');

    const { jwt } = UserStore.getState();

    const options = {
      host: 'localhost',
      port: 8000,
      path: `/?token=${jwt}`,
      secure: false,
      db: 'doorbell_dev',
    };

    return RethinkDBConnect(options)
      .then(conn => this.conn = conn);
  }

  runQuery(query) {
    return query.run(this.conn);
  }

  isConnected() {
    return !!this.conn;
  }
}

export default new RethinkDB();
