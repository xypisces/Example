import 'react';
import { message } from 'antd';
import { mainServices } from '../../services/media/main';

export default {
  namespace: 'media',
  state: {
    honorList: [],
  },
  effects: {
    *unite({payload, dataName='', url, fn, errorfn},{call,put}) {
      try{
        const { data } = yield call(mainServices, payload, url)
        console.log(data)
        if(data && data.code === 200){
          if(dataName !== ''){
            yield put({type:'save', payload:{[`${dataName}`]: data.info}})
          }else{
            message.success(data.message)
          }
          if(fn && fn instanceof Function){
            fn(data.info)
          }
        }else{
          message.error(data.message || '服务器出错')
          if(errorfn && errorfn instanceof Function){
            errorfn()
          }
        }
      }catch(e){ /* eslint-disable no-console */
        console.error(e) 
      }
    },
  },
  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload}
    },
  },
  subscriptions: {

  },
}
