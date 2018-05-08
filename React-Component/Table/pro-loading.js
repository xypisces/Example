import React from 'react';
import { Spin } from 'antd';
import wsCache from 'web-storage-cache';

const wsLocal = new wsCache(); // 初始化缓存
const loginURL = '/admin/login/login';
function Loading() {
    if(window.location.hostname !== 'localhost'){
        const urlParams = new URL(window.location.href);
        const token = wsLocal.get('token')    
      if(!token){
        const arr = urlParams.href.split('=');
        if(arr[1]){
          wsLocal.set('token',arr[1], {exp: 300});
          window.localStorage.setItem('auth', arr[1])
        }else{
          window.location.href = loginURL;
        }
      }
    }else{
        wsLocal.set('token','localhosttoken');
        window.localStorage.setItem('auth', 'localhostauth')
    }
  return(
    <div style={{ textAlign:'center', marginTop: '30px'}}>
      <Spin size="large" />
    </div>
  )
}

export default Loading;