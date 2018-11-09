import React, {Component}from 'react';
import { connect } from 'dva';
import { Form, Input, Radio, Icon, Button } from 'antd';
import './design.less';
import Container from './Dropcard';


class Step2 extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    const { updateData, objSecond, updataStatus } = this.props;
    return(
      <div className='d_step2'>
        <p className='index_title'>服务设计区</p>
        <Container objSecond={objSecond} updateData={updateData} updataStatus={updataStatus}/>
      </div>
    )
  }
}

export default Step2;