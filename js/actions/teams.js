import * as types from 'constants/actionTypes';
import RethinkDB, { r } from 'lib/RethinkDB';

export function fetch(changes = true) {
  const query = r.table('teams');

  RethinkDB.runStatic(query)
    .then(res => res.forEach(doc => dispatch(setTeam(doc))));

  if (changes) {
    RethinkDB.runChanges(query)
      .then(doc => {
        if (!doc.new_val) {
          dispatch(unsetObject(doc.old_val));
        } else {
          dispatch(setObject(doc.new_val));
        }
      });
  }
}

export function setObject(object) {
  return { type: types.SET_OBJECT, object };
}

export function unsetObject(object) {
  return { type: types.UNSET_OBJECT, object };
}
