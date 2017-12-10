import React from 'react';
import { connect } from 'dva';

function Article() {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>here is a article...</h1>
    </div>
  );
}


export default connect()(Article);
