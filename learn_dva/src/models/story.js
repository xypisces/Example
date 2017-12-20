import * as Story from '../services/story';
import {message} from 'antd';

export default {
  namespace: 'story',
  state: {
    msg: {} // 初始化数据
  },
  reducers: {
    save(state, {payload}) {
      return{
        ...state, ...payload,
      }
    }
  },
  effects: {
    *getStory({payload},{call, put}){
      try{
        const {data} = yield call(Story.getArticle, payload);
        if(data){
          yield put({type: 'save', payload: {msg: data.data}});
        }
      }catch(error){
        message.error(error);
      }
    }
  },
  subscriptions: {
  },
};
