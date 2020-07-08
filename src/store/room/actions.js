import store from '@store';
import * as api from '@api';

export const types = {
  SET: Symbol('SET'),
};

export const initState = {
  items: [],
  count: 0,
  current: null,
  wait: false,
  errors: null,
};

const actions = {
  fetchList: async ({ search = null } = {}) => {
    store.dispatch({ type: types.SET, payload: { wait: true, errors: null } });
    try {
      const response = await api.rooms.getList({ search, limit: 100 });
      const result = response.data.result;
      store.dispatch({ type: types.SET, payload: result });
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

  fetchOne: async id => {
    store.dispatch({ type: types.SET, payload: { wait: true, errors: null } });
    try {
      const response = await api.rooms.getOne({ id });
      const current = response.data.result;
      store.dispatch({ type: types.SET, payload: { current } });
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

export default actions;
