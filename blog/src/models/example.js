
import { message } from 'antd';
import * as example from '../services/example';
import { getrandom } from '../services/example';

export default {

  namespace: 'example',

  state: {
    issueslist: [],
    random: {},
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
    /** 随机 */
    *getRandom({ payload }, { call, put }) {
      try {
        const { data } = yield call(example.getrandom, payload);
        if (data) {
          yield put({ type: 'save', payload: { random: data } });
        } else {
          message.error('random error');
        }
      } catch (error) {
        message.error(error);
      }
    },
    /**获取某天 */
    *getoneDay({ payload }, { call, put }) {
      try {
        const { data } = yield call(example.getoneday, payload);
        if (data) {
          yield put({ type: 'save', payload: { random: data } });
        } else {
          message.error('oneday error');
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
