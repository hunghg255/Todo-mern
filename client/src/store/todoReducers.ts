import * as actionTypes from './todoTypes';

const initialState: ApiDataType = {
  message: '',
  status: '',
  todos: [],
}

const reducer = (state = initialState, action: TActions) => {
  if (!action.payload) return state;
  switch (action.type) {
    case actionTypes.GET_ALL_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case actionTypes.FETCH_TODO_FAILED:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

export default reducer;
