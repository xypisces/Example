import React from 'react';
import { Spin } from 'antd';

function Loading() {
  return(
    <div style={{ textAlign:'center', marginTop: '30px'}}>
      <Spin size="large" />
    </div>
  )
}

export default Loading;