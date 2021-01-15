import React from 'react';
import { connect } from 'dva';
import { Form, Button, message } from 'antd';
import { browserHistory } from 'dva/router';
import MenuTop from "../../../components/front/indexPage/MenuTop";
import Footer from '../../../components/front/indexPage/Footer';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { initData, voteData, testData } from './initData';
import _ from 'lodash'
import { btnArr, testArr, voteArr } from './baseData'
import './design.less';

/** 从this.props.location.state接收两个参数
 * id 为创建返回的activity_id
 * sign 为创建的活动标识  invest为问卷，test为综合测评, vote为投票
 */

class Formdesign extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fields: [],
      idNum: 0,
    }
    // console.log(this.props)
    // console.log('--this.props.location---')
    // console.log(this.props.location)
  }
  updataStatus = (data) => {
    this.setState({
      fields: data,
    })
  }
  updateData = (data) => {
    if(_.isEqual(this.state.fields,data)){
			// console.log('----fields一样----')
		}else{
      // console.log('---fields不一样----')
      this.setState({
        fields: data,
      })
		}
  }
  add = (type) => {
    const { fields, idNum } = this.state;
    const { sign } = this.props;
    let newData = [];
    if(sign === 'vote'){
      newData = voteData(type, fields, idNum);
    }else if ( sign === 'test'){
      newData = testData(type, fields, idNum);
    }else{
      newData = initData(type, fields, idNum);
    }
    this.setState({
      idNum: ++this.state.idNum,
      fields: newData,
    })
  }
  submit = () => {
    const param = _.cloneDeep(this.state.fields)
    param.map((item,i)=>{
      item.sort = i;
      delete item.id;
      delete item.status;
      if(item.type === 5 || item.type === 7){
        const arr = []
        if(item.type_extends.length>0){
          item.type_extends.map((it,i)=>{
            arr.push({
              img_name:it.img_name,
              img_desc:it.img_desc,
              img_id: it.img_id
            })
          })
        }
        item.type_extends = arr;
      }
    })
    // console.log('----param-----')
    // console.log(param)
    const { id } = this.props;
    this.props.dispatch({
      type: 'formdesign/adminSecond',
      payload: {
        activity_id:id,
        fields: param,
      },
      fn: () => {
        this.props.dispatch({ type: 'questionnaire/save', payload: { firstStepData: {}, objMember: {} }});
        // console.log('success')
        browserHistory.push({pathname:"/NewAcivity",})
      }
    })
  }
  render(){
    const { fields } = this.state;
    const { sign } = this.props;
    return(
      <div className='d_index'>
        <div className='tabCenter'>
          <p className='index_title'>活动设计器</p>
          <Step1 btnArr={sign==='vote'?voteArr:sign==='test'?testArr:btnArr} add={this.add}/>
          <div className='admin_content'>
            <Step2 updateData={this.updateData} objSecond={fields} updataStatus={this.updataStatus}/>
            <Step3 objSecond={fields} updateData={this.updateData}/>
          </div>
          <div className='submit'>
              <Button onClick={()=>{this.props.prev()}}>上一步</Button>
              <Button type="primary" className='sumbit_ok' loading={this.props.loading} onClick={this.submit}>完成</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    fields: state.formdesign.fields,
    loading: state.loading.models.formdesign,
  }
})(Formdesign)
