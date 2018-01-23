
import { message } from 'antd';
import * as example from '../services/example';

export default {

  namespace: 'example',

  state: {
    issueslist: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    /**
     * issues列表
     */
    *getissues({ payload }, { call, put }) {
      try {
        const { data } = yield call(example.getIssues, payload);
        if (data) {
          yield put({ type: 'save', payload: { issueslist: data } });
        } else {
          message.error('issues error');
        }
      } catch (error) {
        message.error(error);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
