import { combineReducers } from 'redux';

import apiRequests from 'reducers/apiRequests';
import objects from 'reducers/objects';

const rootReducer = combineReducers({
  apiRequests,
  teams: objects
});

export default rootReducer;
