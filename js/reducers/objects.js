import { SET_OBJECT, UNSET_OBJECT } from 'constants/actionTypes';

const initialState = new Map();

export default function objects(state = initialState, action) {
  switch (action.type) {
    case SET_OBJECT:
      return new Map([
        ...state,
        [action.object.id, action.object]
      ]);

    case UNSET_OBJECT:
      return new Map([...state]).delete(action.object.id);

    default:
      return state;
  }
}
