import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state.merge({logging_in: true});
    case types.LOGIN_SUCCESS:
      return state.merge({logging_in: false, logged_in: true, token: action.token});
    case types.LOGIN_FAILURE:
      return state.merge({logging_in: false});
    case types.LOGOUT:
      return state.merge({logged_in: false, token: null});
    default:
      return state;
  }
}