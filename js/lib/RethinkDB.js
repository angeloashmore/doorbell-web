import { connect as RethinkDBConnect, rethinkdb } from 'rethinkdb-websocket-client';
import { UserStore } from 'stores';

export const r = rethinkdb;

class RethinkDB {
  constructor() {
    this.conn = null;
  }

  connect() {
    if (this.isConnected()) return Promise.resolve(this.conn);

    const jwt = localStorage.getItem('jwt');

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
    return this.connect()
      .then(conn => query.run(conn));
  }

  runStatic(query) {
    return this.runQuery(query)
      .then(cur => cur.toArray());
  }

  runChanges(query) {
    return this.runQuery(query.changes({ includeStates: true }))
      .then(cur => {
        let feedStateReady = false;
        cur.each((err, row) => {
          if (err) throw err;
          if (row.state) {
            feedStateReady = row.state === 'ready';
          } else if (feedStateReady) {
            return row;
          }
        });
      });
  }

  isConnected() {
    return !!this.conn;
  }
}

export default new RethinkDB();
