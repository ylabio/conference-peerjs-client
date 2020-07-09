import store from '@store';
import * as api from '@api';
import { session } from '../actions';

export const types = {
  SET: Symbol('SET'),
};

export const initState = {
  data: {
    login: '',
    password: '',
  },
  wait: false,
  errors: null,
};

export default {
  change: data => {
    store.dispatch({
      type: types.SET,
      payload: { data },
    });
  },

  submit: async data => {
    store.dispatch({ type: types.SET, payload: { wait: true, errors: null } });
    try {
      const response = await api.users.login(data);
      const result = response.data.result;
      await session.save({ user: result.user, token: result.token });
      store.dispatch({ type: types.SET, payload: { ...initState } });
      return result;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        store.dispatch({
          type: types.SET,
          payload: { wait: false, errors: e.response.data.error.data.issues },
        });
      } else {
        throw e;
      }
    }
  },
};
