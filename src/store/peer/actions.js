import store from '@store';
import * as api from '@api';

export const types = {
  SET: Symbol('SET'),
};

export const initState = {
  items: [],
  count: 0,
  myPeer: null,
  wait: false,
  errors: null,
};

const actions = {
  fetchByRoom: async roomId => {
    store.dispatch({ type: types.SET, payload: { wait: true, errors: null } });
    try {
      const response = await api.peers.getList({
        search: { room: roomId },
        limit: 100,
        fields: '*,user(*)',
      });
      const result = response.data.result;
      store.dispatch({ type: types.SET, payload: { wait: false, ...result } });
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

  connect: async peerId => {
    store.dispatch({ type: types.SET, payload: { wait: true, errors: null } });
    try {
      const { room } = store.getState();
      console.log('CONNECT', peerId, room);
      const response = await api.peers.create({
        data: { peerId, room: { _id: room.current._id } },
      });
      const result = response.data.result;
      store.dispatch({ type: types.SET, payload: { wait: false, myPeer: result } });
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
