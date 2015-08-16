import { START_REQUEST, END_REQUEST } from 'constants/actionTypes';

const initialState = { loading: false };

export default function objects(state = initialState, action) {
  switch (action.type) {
    case START_REQUEST:
      return { loading: true };

    case END_REQUEST:
      return { loading: false };

    default:
      return state;
  }
}
