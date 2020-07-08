import reducer from '@utils/reducer';
import mc from 'merge-change';
import { types, initState } from './actions.js';

export default reducer(initState, {
  [types.SET]: (state, action) => {
    return mc.update(state, action.payload);
  },
});
