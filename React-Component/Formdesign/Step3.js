import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Checkbox, InputNumber, Radio, Switch, Icon, message } from 'antd';
import './design.less';
import FormRadio from './component/Radio';
import FormCheckbox from './component/Checkbox';
import FormFill from './component/Fillblank';
import RichText from './component/richText';
import Pic from './component/Pic';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _ from 'lodash'
let uuid = 1;
class Step3 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      obj: undefined,
      objSecond: undefined
    }
  }
  componentWillReceiveProps(nextProps){
    const obj = nextProps.objSecond.filter( c => c.status === 1 )[0]
    this.setState({
      obj,
      objSecond: nextProps.objSecond,
    })
  }
  render(){
    const { obj, objSecond } = this.state;
    const { updateData } = this.props;
    // const { objSecond } = this.props;
    let content = null;
    if( obj && obj.type === 1) {
      content = <FormRadio data={obj} fields={objSecond} updateData={updateData}/>
    }else if( obj && obj.type === 2){
      content = <FormCheckbox data={obj} fields={objSecond} updateData={updateData}/>
    }else if( obj && (obj.type === 3 || obj.type === 4)){
      content = <FormFill data={obj} fields={objSecond} updateData={updateData}/>
    }else if( obj && (obj.type === 6)){
      content = <RichText data={obj} fields={objSecond} updateData={updateData}/>
    }else if( obj && (obj.type === 5 || obj.type === 7)){
      content = <Pic data={obj} fields={objSecond} updateData={updateData}/>
    }else{
      content = null
    }
    return (
      <div className='d_step3'>
        <p className='index_title'>控件属性区</p>
        {content}
      </div>
    )
  }
}

export default Step3;